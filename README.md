**FastAPI Code for Change Password and OTP Verification**
To implement a FastAPI application that includes routes for changing a password and verifying an OTP (One-Time Password), we will follow these steps:

1.	Define the Schemas: Create Pydantic models for the request bodies.
2.	Set Up User Authentication: Ensure that users are authenticated before they can change their password or verify their OTP.
3.	Implement Routes: Create routes for changing the password and sending/validating the OTP.
4.	Email Sending Logic: Include functionality to send an OTP to the user’s email.
   
**Step 1:** Define the Schemas
We will create two schemas using Pydantic: one for changing the password and another for verifying the OTP.
from pydantic import BaseModel, EmailStr, Field

class ChangePasswordSchema(BaseModel):
    old_password: str = Field(..., min_length=8)
    new_password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)

class OTPSchema(BaseModel):
    code: str
    
**Step 2:** Set Up User Authentication
For user authentication, you might typically use OAuth2 with password flow or JWT tokens. Here’s a simplified version assuming you have some authentication middleware in place.

**Step 3:** Implement Routes
Now we will implement the FastAPI routes.
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import random
import smtplib

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mock database for users and OTPs
fake_users_db = {
    "user@example.com": {
        "username": "user@example.com",
        "full_name": "John Doe",
        "hashed_password": "fakehashedpassword",
        "otp": None,
    }
}

def send_otp(email):
    otp_code = str(random.randint(100000, 999999))
    fake_users_db[email]["otp"] = otp_code
    
    # Here you would integrate with an actual email service
    print(f"Sending OTP {otp_code} to {email}")

@app.post("/change-password")
async def change_password(
    change_password_data: ChangePasswordSchema,
    token: str = Depends(oauth2_scheme)
):
    user_email = "user@example.com"  # Extract from token in real implementation
    user = fake_users_db.get(user_email)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if change_password_data.new_password != change_password_data.confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")

    # Here you would verify the old password against hashed password in DB
    if change_password_data.old_password != "fakehashedpassword":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Old password is incorrect")

    # Update password logic here (hashing and saving to DB)
    
    return {"msg": "Password changed successfully"}

@app.post("/send-otp")
async def send_otp_route(email: EmailStr):
    if email not in fake_users_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    send_otp(email)
    
    return {"msg": "OTP sent successfully"}

@app.post("/verify-otp")
async def verify_otp(otp_data: OTPSchema, token: str = Depends(oauth2_scheme)):
    user_email = "user@example.com"  # Extract from token in real implementation
    user = fake_users_db.get(user_email)

    if not user or user["otp"] != otp_data.code:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid OTP")

    # Clear OTP after verification
    user["otp"] = None
    
    return {"msg": "OTP verified successfully"}
    
**Explanation of Code Components:**
●	Schemas define the structure of incoming requests.
●	The send_otp function generates a random six-digit code and simulates sending it via email.
●	The /change-password route checks if the old password matches before allowing a new password to be set.
●	The /send-otp route sends an OTP to the user’s registered email address.
●	The /verify-otp route checks if the provided code matches what was sent.

This example uses mock data; in a production environment, you would replace this with actual database calls and secure methods for handling passwords (like hashing).

**Conclusion**
This FastAPI application provides basic functionality for changing passwords securely while ensuring that users authenticate themselves through an OTP process. 

![Word-wiz Application System Design Architecture drawio](https://github.com/user-attachments/assets/5fa1de81-5702-4b17-b87a-038a5c57302c)


Word Wiz!!!!!!!!