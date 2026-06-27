# Prompt 04 - OTP & Aadhaar Verification

You are a Security and Auth Engineer. Implement the authentication sandbox.

## Objectives
* Build a secure Mobile Number + OTP login page using react-hook-form.
* Implement Aadhaar details form to fetch and mock demographic data (Name, DOB, Gender, State, District, Pin Code).
* Integrate interactive regional consent checkbox and notice overlays detailing DPDP Act requirements before verifying.
* Mock credentials sync from DigiLocker API using OAuth 2.0 flow stubs.
* Store verified profiles securely in user contexts.

## Verification
* Verify JWT tokens and user session expirations are stored securely in localStorage.
* Confirm that no PII details are stored without checking the DPDP consent box.
