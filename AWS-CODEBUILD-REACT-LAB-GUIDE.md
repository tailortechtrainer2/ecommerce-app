# AWS CodeBuild + GitHub for a React App

This lab deploys a Vite/React application to an S3 static website without CodePipeline:

```text
GitHub push -> CodeBuild webhook -> npm ci -> npm run build -> dist/ -> S3 bucket root
```

## Example Values

Replace these values if your resources have different names:

```text
Region: us-east-1
GitHub branch: master
CodeBuild project: react-cicd-build-new
S3 bucket: react-cicd-demo-123456
Website: http://react-cicd-demo-123456.s3-website-us-east-1.amazonaws.com/
```

## 1. Prerequisites

- A GitHub repository containing `package.json` and `package-lock.json`.
- Node.js/npm for local testing.
- AWS CLI configured for the correct account.
- AWS permissions to configure S3, IAM, and CodeBuild.

Check the tools:

```bash
node --version
npm --version
aws sts get-caller-identity
```

Test the React project locally from the directory containing `package.json`:

```bash
npm ci
npm run build
test -f dist/index.html && echo "dist/index.html exists"
```

Commit `package-lock.json`. The build uses `npm ci`, which requires this file.

## 2. Create and Configure the S3 Website

Create the bucket:

```bash
aws s3 mb s3://react-cicd-demo-123456 --region us-east-1
```

Enable website hosting. The error document should also be `index.html` for React client-side routes:

```bash
aws s3 website s3://react-cicd-demo-123456/ \
  --index-document index.html \
  --error-document index.html \
  --region us-east-1
```

Allow public reads for this learning setup:

```bash
cat > /tmp/react-website-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadForWebsite",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::react-cicd-demo-123456/*"
  }]
}
EOF

aws s3api put-bucket-policy \
  --bucket react-cicd-demo-123456 \
  --policy file:///tmp/react-website-policy.json \
  --region us-east-1
```

If Block Public Access prevents this policy, review the bucket settings. For production, use CloudFront with a private S3 bucket and Origin Access Control instead of a public S3 website.

## 3. Give CodeBuild S3 Deployment Permissions

Add this policy as an inline policy to the CodeBuild service role in **IAM -> Roles**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::react-cicd-demo-123456"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::react-cicd-demo-123456/*"
    }
  ]
}
```

`s3:DeleteObject` is required because the deployment uses `--delete` to remove old hashed JavaScript and CSS files.

## 4. Add the Correct `buildspec.yml`

Place this file in the GitHub repository root, beside `package.json`:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20

  pre_build:
    commands:
      - echo Installing dependencies...
      - npm ci

  build:
    commands:
      - echo Building React application...
      - npm run build

  post_build:
    commands:
      - echo Deploying React application to S3 website root...
      - aws s3 sync dist/ s3://react-cicd-demo-123456/ --delete --region us-east-1 --cache-control "public,max-age=31536000,immutable"
      - aws s3 cp dist/index.html s3://react-cicd-demo-123456/index.html --region us-east-1 --cache-control "no-cache,no-store,must-revalidate" --content-type "text/html"
      - echo Build and deployment completed successfully
```

Why this works:

- `npm ci` installs the committed lock-file versions.
- `npm run build` creates `dist/`.
- `aws s3 sync dist/ s3://.../` copies the *contents* of `dist/` to the bucket root.
- `--delete` removes obsolete hashed assets.
- Hashed assets can be cached; `index.html` cannot, so new asset names are discovered.
- There is intentionally no `artifacts:` section.

## 5. Create the CodeBuild Project

In **AWS Console -> CodeBuild -> Create build project**:

1. Enter a project name, such as `react-cicd-build-new`.
2. Choose **GitHub** as the source and connect the repository.
3. Select the correct branch, such as `master`.
4. Choose a managed Linux image with Node.js 20 support.
5. Select or create the CodeBuild service role and add the S3 policy above.
6. Choose **Use a buildspec file** and set the name to `buildspec.yml`.
7. Set **Artifacts** to **No artifacts**.
8. Create the project.

The project must report:

```text
Artifacts type: NO_ARTIFACTS
```

Do not configure an S3 artifact named `react-cicd-build-new`. That setting creates an extra prefix such as:

```text
s3://react-cicd-demo-123456/react-cicd-build-new/
```

The website requires `index.html` here instead:

```text
s3://react-cicd-demo-123456/index.html
```

## 6. Enable Automatic Builds from GitHub

In the CodeBuild project:

1. Choose **Edit**.
2. Under **Primary source webhook events**, enable **Webhook**.
3. Select rebuild on every push.
4. Filter to the correct branch, such as `master`.
5. Save the project.

The branch must match in GitHub, the CodeBuild source, and the webhook filter:

```text
GitHub branch = CodeBuild branch = webhook branch filter
```

## 7. Push and Test

```bash
git add buildspec.yml package.json package-lock.json src/
git commit -m "Configure React deployment with CodeBuild"
git push origin master
```

A successful build should show:

```text
INSTALL          SUCCEEDED
PRE_BUILD        SUCCEEDED
BUILD            SUCCEEDED
POST_BUILD       SUCCEEDED
COMPLETED        SUCCEEDED
```

Verify the artifact setting:

```bash
aws codebuild batch-get-projects \
  --names react-cicd-build-new \
  --region us-east-1 \
  --query 'projects[0].artifacts.type' \
  --output text
```

Expected output:

```text
NO_ARTIFACTS
```

Verify the S3 layout:

```bash
aws s3 ls s3://react-cicd-demo-123456/ --recursive --region us-east-1
aws s3 ls s3://react-cicd-demo-123456/index.html --region us-east-1
```

Correct layout:

```text
index.html
assets/
assets/index-<hash>.js
assets/index-<hash>.css
```

Verify the website:

```bash
curl -I -L --max-time 15 \
  http://react-cicd-demo-123456.s3-website-us-east-1.amazonaws.com/
```

Expected response:

```text
HTTP/1.1 200 OK
```

Use `Cmd + Shift + R` on macOS or `Ctrl + Shift + R` on Windows/Linux to bypass browser cache.

## 8. Troubleshooting

### `404 NoSuchKey: index.html`

The file is not at the bucket root:

```bash
aws s3 ls s3://react-cicd-demo-123456/index.html --region us-east-1
```

The deployment command must end with the bucket root `/`, not `dist/` or a project-name prefix:

```bash
aws s3 sync dist/ s3://react-cicd-demo-123456/ --delete
```

### `react-cicd-build-new/` appears in S3

Set the CodeBuild artifact type to `NO_ARTIFACTS` and remove any `artifacts:` section from the buildspec. After confirming root files exist, remove the old prefix:

```bash
aws s3 ls s3://react-cicd-demo-123456/index.html --region us-east-1
aws s3 rm s3://react-cicd-demo-123456/react-cicd-build-new/ \
  --recursive --region us-east-1
```

### Website updates but CodeBuild is `FAILED`

Find the failed phase:

```bash
aws codebuild batch-get-builds \
  --ids YOUR_BUILD_ID \
  --region us-east-1 \
  --query 'builds[0].phases[?phaseStatus==`FAILED`]'
```

If the error says `not authorized to perform: s3:DeleteObject`, add `s3:DeleteObject` for:

```text
arn:aws:s3:::react-cicd-demo-123456/*
```

Uploads can succeed before deletion fails, so the UI may update while the build is marked failed.

### `npm ci` fails

Run locally:

```bash
npm ci
npm run build
```

Commit `package-lock.json` and ensure it matches `package.json`.

### GitHub push does not start a build

Check that the webhook is enabled, the repository is correct, the branch filter matches the pushed branch, and GitHub webhook deliveries are successful.

## Final Checklist

- [ ] `npm ci` and `npm run build` succeed locally.
- [ ] `package-lock.json` is committed.
- [ ] S3 website index and error documents are `index.html`.
- [ ] CodeBuild role has `s3:ListBucket`, `s3:PutObject`, and `s3:DeleteObject`.
- [ ] `buildspec.yml` syncs `dist/` to the S3 bucket root.
- [ ] CodeBuild artifact type is `NO_ARTIFACTS`.
- [ ] GitHub webhook targets the correct branch.
- [ ] S3 root contains `index.html` and `assets/`.
- [ ] CodeBuild `POST_BUILD` succeeds.
- [ ] The website returns `HTTP 200 OK`.

For production, prefer CloudFront with HTTPS and a private S3 bucket rather than a public HTTP S3 website.
