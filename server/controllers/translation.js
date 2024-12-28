const Translation = require('../models/Translation');

class TranslationService {
    async getTranslationsByLang(lang) {
        return await Translation.find({ lang }).exec();
    }

    async addTranslation(lang, key, value) {
        const translation = new Translation({ lang, key, value });
        await translation.save();
        return translation;
    }
}

module.exports = TranslationService;