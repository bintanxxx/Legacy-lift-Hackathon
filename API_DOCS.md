# 🔌 LegacyLift Backend API Documentation

Documentation for the AI Refactoring Engine powered by Google Gemini 2.5.

## 🚀 Main Endpoint

**URL:** `POST /api/refactor`  
**Description:** Sends code to the AI engine to be refactored, modernized, or migrated based on specific instructions.

---

### 📥 Request Structure

**Headers:**

- `Content-Type: application/json`

**Body Params:**

| Field    | Type   | Required | Description                                                     |
| :------- | :----- | :------- | :-------------------------------------------------------------- |
| `code`   | string | Yes      | The raw source code you want to transform.                      |
| `mode`   | string | Yes      | The category of operation (`refactor`, `modernize`, `migrate`). |
| `target` | string | Yes      | The specific instruction key (see "Valid Targets" below).       |

**Example Request:**

```json
{
  "code": "console.log('hello')",
  "mode": "modernize",
  "target": "js-async"
}
```
