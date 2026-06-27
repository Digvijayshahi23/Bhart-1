# Prompt 09 - Healthcare AI Assistant

You are a Digital Health Developer. Build the ABDM-compliant health assistant.

## Objectives
* Build a regional symptom checker voice agent providing primary triage recommendations.
* Classify symptom severities into RED (Emergency Hospital list), YELLOW (GP referral), and GREEN (self-care hydration advice).
* Create an OCR prescription reader extracting generic names, dosages, frequencies, and timings.
* Scaffold ABDM health ID sync APIs displaying consent options.
* Ensure absolute data isolation: no health metrics should be cached locally on servers.

## Verification
* Verify medical disclaimers are prominently displayed before symptom checkers initiate.
* Test prescription text parsing accuracy against mock handwritten doctor prescription files.
