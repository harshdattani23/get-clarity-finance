# Language Support Analysis: Website vs AutoContent API

## Current Website Languages (Locales)
Based on the locales directory, your website supports:
1. **bn** - Bengali (বাংলা) ✅ *Has podcast support*
2. **en** - English ✅ *Has podcast support*  
3. **en-IN** - English (India) ❌ *No podcast support*
4. **gu** - Gujarati (ગુજરાતી) ✅ *Has podcast support*
5. **hi** - Hindi (हिंदी) ✅ *Has podcast support*
6. **kn** - Kannada ❌ *No podcast support*
7. **ml** - Malayalam ❌ *No podcast support*
8. **mr** - Marathi (मराठी) ✅ *Has podcast support*
9. **pa** - Punjabi ❌ *No podcast support*
10. **ta** - Tamil (தமிழ்) ✅ *Has podcast support*
11. **te** - Telugu (తెలుగు) ✅ *Has podcast support*

**Total Website Languages: 11**
**Current Podcast Languages: 7**
**Missing Podcast Support: 4**

## AutoContent API Supported Languages

### Indian Languages Supported by AutoContent API
From the API documentation, these Indian languages are available:
- **हिन्दी** (Hindi) ✅ *Currently supported*
- **বাংলা** (Bengali) ✅ *Currently supported*  
- **ਪੰਜਾਬੀ** (Punjabi) ❌ *Missing from podcast config*
- **ગુજરાતી** (Gujarati) ✅ *Currently supported*
- **ଓଡ଼ିଆ** (Odia) ❌ *Not on website*
- **তমিল** (Tamil) ✅ *Currently supported*
- **తెలుగు** (Telugu) ✅ *Currently supported*
- **ಕನ್ನಡ** (Kannada) ❌ *Missing from podcast config*
- **മലയാളം** (Malayalam) ❌ *Missing from podcast config*
- **සිංහල** (Sinhala) ❌ *Not on website*
- **मराठी** (Marathi) ✅ *Currently supported*
- **कोंकणी** (Konkani) ❌ *Not on website*
- **नेपाली** (Nepali) ❌ *Not on website*
- **मैथिली** (Maithili) ❌ *Not on website*

### Other Major Languages in AutoContent API
- **English** ✅ *Currently supported*
- **español** (Spanish) ❌ *Not on website*
- **français** (French) ❌ *Not on website*
- **Deutsch** (German) ❌ *Not on website*
- **português** (Portuguese) ❌ *Not on website*
- **italiano** (Italian) ❌ *Not on website*
- **русский** (Russian) ❌ *Not on website*
- **中文（简体）** (Chinese Simplified) ❌ *Not on website*
- **中文（繁體）** (Chinese Traditional) ❌ *Not on website*
- **日本語** (Japanese) ❌ *Not on website*
- **한국어** (Korean) ❌ *Not on website*
- **العربية** (Arabic) ❌ *Not on website*
- **اردو** (Urdu) ❌ *Not on website*
- **فارسی** (Persian) ❌ *Not on website*
- **ไทย** (Thai) ❌ *Not on website*

## Missing Podcast Support Analysis

### 🔴 **High Priority - Website Languages Missing Podcast Support**
1. **kn (Kannada)** - `ಕನ್ನಡ` ✅ *Supported by AutoContent API*
2. **ml (Malayalam)** - `മലയാളം` ✅ *Supported by AutoContent API*  
3. **pa (Punjabi)** - `ਪੰਜਾਬੀ` ✅ *Supported by AutoContent API*

### 🟡 **Medium Priority - Other Considerations**
1. **en-IN (English India)** - Could use regular "English" from AutoContent API
2. **Odia (ଓଡ଼ିଆ)** - Supported by AutoContent API but not on your website

## Recommendations

### Immediate Actions Required
1. **Add Missing Podcast Language Configurations:**
   ```typescript
   kn: {
     code: 'kn',
     label: 'Kannada',
     nativeName: 'ಕನ್ನಡ',
     autoContentCode: 'ಕನ್ನಡ',
     enabled: true,
   },
   ml: {
     code: 'ml', 
     label: 'Malayalam',
     nativeName: 'മലയാളം',
     autoContentCode: 'മലയാളം',
     enabled: true,
   },
   pa: {
     code: 'pa',
     label: 'Punjabi', 
     nativeName: 'ਪੰਜਾਬੀ',
     autoContentCode: 'ਪੰਜਾਬੀ',
     enabled: true,
   }
   ```

2. **Add Language-Specific Prompts:** Update `LANGUAGE_PROMPT_INSTRUCTIONS` for these three languages

3. **Handle en-IN:** Map en-IN to use "English" from AutoContent API

### Future Considerations
1. **Odia Language:** Consider adding Odia support to both website and podcast generation
2. **International Markets:** Consider adding Spanish, French, Chinese for broader appeal

## Summary
- **Current Gap:** 4 out of 11 website languages lack podcast support
- **Immediate Fix:** Add Kannada, Malayalam, and Punjabi to podcast configuration  
- **All missing languages are supported by AutoContent API** ✅
- **No technical blockers** - purely configuration issue

The good news is that AutoContent API supports ALL the languages your website offers, so this is just a matter of updating your podcast configuration file!
