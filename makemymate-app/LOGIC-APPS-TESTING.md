# Azure Logic Apps Testing Guide

## 📋 Sample JSON Requests

### English Request (`sample-logic-apps-request.json`)
Use this for testing English character generation.

### German Request (`sample-logic-apps-request-de.json`)
Use this for testing German character generation.

## 🧪 Testing Methods

### Method 1: Postman/Insomnia
1. **URL**: `https://your-logic-apps-url.azurewebsites.net:443/api/generate-character/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=your_signature`
2. **Method**: POST
3. **Headers**: 
   - `Content-Type`: `application/json`
4. **Body**: Copy the content from `sample-logic-apps-request.json`

### Method 2: cURL
```bash
curl -X POST \
  https://your-logic-apps-url.azurewebsites.net:443/api/generate-character/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=your_signature \
  -H 'Content-Type: application/json' \
  -d @sample-logic-apps-request.json
```

### Method 3: Azure Logic Apps Designer
1. Open your Logic Apps workflow in Azure Portal
2. Click "Run Trigger" → "Manual"
3. Paste the JSON content from the sample files
4. Click "Run"

## 📊 Expected Response Structure

```json
{
  "name": "Prince Lucian",
  "title": "The Dark Enchanter",
  "description": "A mysterious prince with piercing amber eyes and a troubled past. He's protective, possessive, and willing to burn the world for the one he loves.",
  "personality": "A brooding prince who hides his vulnerability behind a cold exterior. He's fiercely loyal and protective, with a dark side that only emerges when those he loves are threatened.",
  "background": "Born into a cursed royal family, Lucian learned to wield dark magic to protect his kingdom. His heart was hardened by betrayal, until he met someone who could see through his facade.",
  "aesthetic": "Gothic Romance",
  "traits": ["Mysterious", "Protective", "Possessive", "Dark Magic", "Royal Blood"],
  "imageUrl": "https://your-project.supabase.co/storage/v1/object/public/characters/session-1706352660000-abc123def.jpg"
}
```

## 🔍 Testing Checklist

### ✅ Pre-Testing Setup
- [ ] Logic Apps workflow is deployed and running
- [ ] Azure OpenAI connection is configured
- [ ] Replicate API token is set up
- [ ] Supabase connection is configured
- [ ] Environment variables are set in Logic Apps

### ✅ Request Validation
- [ ] JSON structure matches expected format
- [ ] All 12 quiz answers are included
- [ ] Language field is set correctly ("en" or "de")
- [ ] Timestamps are in ISO format
- [ ] SessionId is unique

### ✅ Response Validation
- [ ] Response contains all required fields
- [ ] Character name is generated
- [ ] Title is creative and fitting
- [ ] Description is detailed and engaging
- [ ] Personality section is included
- [ ] Background story is provided
- [ ] Aesthetic style is specified
- [ ] Traits array contains 5 elements
- [ ] ImageUrl points to valid Supabase storage

### ✅ Error Handling
- [ ] Test with invalid JSON structure
- [ ] Test with missing required fields
- [ ] Test with empty quiz answers array
- [ ] Test with invalid language code
- [ ] Verify graceful error responses

## 🐛 Common Issues & Solutions

### Issue: "Logic Apps request failed: 401"
**Solution**: Check API key and authentication in Logic Apps

### Issue: "Logic Apps request failed: 400"
**Solution**: Verify JSON structure matches expected schema

### Issue: "Logic Apps request failed: 500"
**Solution**: Check Logic Apps workflow logs for internal errors

### Issue: Image generation fails
**Solution**: Verify Replicate API token and model availability

### Issue: Supabase storage fails
**Solution**: Check Supabase connection and bucket permissions

## 📈 Performance Testing

### Expected Response Times
- **Text Generation**: 5-15 seconds
- **Image Generation**: 30-60 seconds
- **Total Pipeline**: 45-90 seconds

### Load Testing
- Test with multiple concurrent requests
- Monitor Logic Apps execution history
- Check for rate limiting on external APIs

## 🔧 Debugging Tips

1. **Enable Logic Apps Logging**: Turn on detailed logging in Azure Portal
2. **Check Execution History**: Review each step in the workflow
3. **Test Individual Steps**: Test Azure OpenAI and Replicate separately
4. **Monitor Costs**: Track API usage and costs
5. **Validate Outputs**: Check each step's output format

## 📝 Test Scenarios

### Scenario 1: English Dark Romance Character
- Use `sample-logic-apps-request.json`
- Expect gothic/dark aesthetic
- Verify English language content

### Scenario 2: German Fantasy Character
- Use `sample-logic-apps-request-de.json`
- Expect German language content
- Verify proper character generation

### Scenario 3: Edge Cases
- Test with minimal quiz answers
- Test with extreme slider values (0, 10)
- Test with special characters in answers

## 🚀 Next Steps After Testing

1. **Integration**: Connect to your Next.js app
2. **Environment Variables**: Add Logic Apps URL to `.env.local`
3. **Error Handling**: Implement fallback mechanisms
4. **Monitoring**: Set up alerts for failures
5. **Optimization**: Fine-tune prompts and parameters
