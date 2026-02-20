# Deploying to Vercel

Follow these steps to deploy your full-stack application.

## Prerequisites
1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **GitHub Repository**: Push this code to a GitHub repository.

## Deployment Steps (Recommended)

1.  **Push to GitHub**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin YOUR_REPO_URL
    git push -u origin main
    ```

2.  **Import to Vercel**:
    -   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **"Add New Project"**.
    -   Select your GitHub repository.

3.  **Configure Project**:
    -   **Framework Preset**: Select **Vite**.
    -   **Root Directory**: Leave as `./` (root).
    -   **Build Command**: `cd frontend && npm install && npm run build`
    -   **Output Directory**: `frontend/dist`
    -   **Environment Variables**:
        -   `VITE_API_URL`: `/api` (This ensures frontend calls the serverless function)

4.  **Deploy**:
    -   Click **Deploy**. Vercel will build the frontend and deploy the Python backend as Serverless Functions automatically based on `api/index.py`.

## Important Notes

-   **Model File**: Ensure `backend/model.pkl` is committed to your repository. It is required for predictions.
-   **Dependencies**: Vercel will install Python dependencies from `backend/requirements.txt` automatically if detected, or you may need to move it to root as `requirements.txt`.
    -   *Recommendation*: Copy `backend/requirements.txt` to the root folder just in case.

## Troubleshooting

-   **Function Logs**: Check the "Functions" tab in your Vercel deployment if the API fails.
-   **Build Failures**: Ensure the Build Command correctly navigates to `frontend` folder.
