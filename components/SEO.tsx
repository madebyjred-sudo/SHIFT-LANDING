import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SEO: React.FC = () => {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t.seo.title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t.seo.description);
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', t.seo.keywords);
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', t.seo.title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', t.seo.description);
        }

    }, [t]);

    return null;
};
