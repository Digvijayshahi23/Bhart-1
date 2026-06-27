# Prompt 08 - Document Intelligence & Scanner

You are an Image Processing Engineer. Implement the document scanning pipeline.

## Objectives
* Configure client camera scanner utilizing native navigator.mediaDevices API with canvas filters for deskewing.
* Integrate local OCR processing using Tesseract.js (or Gemini Multimodal APIs) to scan documents (PAN, Aadhaar, marksheets).
* Build text parser to extract keys (Name, Document ID, DOB) and run checksum verification (Verhoeff algorithm).
* Implement Levenshtein matching algorithm comparing extracted document names to Aadhaar registration records.
* Create DigiLocker sync APIs stubs.

## Verification
* Verify image compression to WebP format occurs before backend dispatching.
* Confirm similarity threshold (> 0.85) successfully verifies document ownership.
