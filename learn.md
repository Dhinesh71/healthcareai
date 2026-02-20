# 🎓 Learn About DiaPredict AI

Welcome! This file explains how this project works in very simple English.

## 1. What is this project?
DiaPredict is an **AI (Artificial Intelligence)** system. Its job is to look at someone's health information (like age, blood sugar, and weight) and guess if they are at risk of having diabetes.

---

## 2. How the "Brain" Works (The AI Model)
The "brain" of this project is a Machine Learning model called **Random Forest**.

*   **Learning**: Imagine the computer looking at thousands of past medical records. It learns that "High Blood Sugar + High BMI usually = Diabetes."
*   **Predicting**: When you give it your data, it compares your data to what it learned and gives a "Risk Score."

---

## 3. The Two Parts of the Application
The project is split into two parts because AI is "heavy" and needs a strong server.

### A. The Frontend (The Face 🎨)
*   **What it is**: The website you see in your browser.
*   **Built with**: React (a popular tool for making websites).
*   **Job**: To show you the form, let you move sliders, and show you the results with pretty charts.
*   **Hosted on**: **Vercel** (good for fast websites).

### B. The Backend (The Engine ⚙️)
*   *What it is*: A hidden computer program that holds the AI model.
*   **Built with**: FastAPI (Python).
*   **Job**: It waits for data from the website, runs it through the AI model, and sends back the result.
*   **Hosted on**: **Render** (good for heavy AI calculation).

---

## 4. How the Data Travels (The Conversation 💬)
1.  **You** move a slider on the website.
2.  The **Frontend** packages that data into a small digital envelope (JSON).
3.  The **Frontend** sends that envelope over the internet to the **Backend** on Render.
4.  The **Backend** opens the envelope, asks the AI model for a prediction.
5.  The **Backend** sends the answer back to the **Frontend**.
6.  The **Frontend** shows you: "High Risk" or "Low Risk."

---

## 5. Why do we need "Environment Variables"?
Imagine the Frontend needs to call the Backend on a phone. The **Environment Variable** (`VITE_API_URL`) is the **phone number** of the backend. Without this, the website doesn't know where to send your health data.

---

## 6. Key Words to Remember
*   **Random Forest**: The type of AI that uses many "decision trees" to find the answer.
*   **FastAPI**: A very fast tool to make the back of the website talk to the front.
*   **Vite**: A tool that makes the website load super fast while building it.
*   **Deployment**: The act of putting your code on the internet so everyone can see it.

---

## 7. Safety First! 🏥
This is a **prediction system**, not a real doctor. It uses math and patterns to guess, but it should only be used for learning and inspiration!
