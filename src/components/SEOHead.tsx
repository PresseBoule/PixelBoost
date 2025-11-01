import { useEffect } from 'react';
import logoP from 'figma:asset/bbee81897b4d20dbd386b05434b37a0e961fda0c.png';
import logoSpiral from 'figma:asset/1ec2bdd018d97abf8279c781aadc3609c6eec133.png';
import logoComplete from 'figma:asset/7a3cff452ea6dbc97f15954d7ea7c6af027aa100.png';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export function SEOHead({
  title = 'PixelBoost - Création Sites Web Bordeaux | Agence Web Gironde',
  description = 'Agence web à Bordeaux spécialisée dans la création de sites internet modernes et performants. Sites vitrine, e-commerce, applications web sur mesure. Développeur web professionnel sur Bordeaux et la Gironde. Tarifs à partir de 499€. Contact : 07 85 75 90 40',
  keywords = 'création site web bordeaux, agence web bordeaux, développeur web bordeaux, site internet bordeaux, création site bordeaux, agence web gironde, développeur web gironde, site vitrine bordeaux, site e-commerce bordeaux, application web bordeaux, webdesigner bordeaux, création site internet bordeaux, développement web bordeaux, agence digitale bordeaux, site internet professionnel bordeaux, création site web nouvelle-aquitaine, freelance web bordeaux, développeur freelance bordeaux',
  ogImage = logoComplete,
  url = 'https://pixelboost.fr'
}: SEOHeadProps) {
  
  useEffect(() => {
    // Titre de la page
    document.title = title;

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Meta author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'PixelBoost');

    // Meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', url);

    // Open Graph
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:site_name', content: 'PixelBoost' },
    ];

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Twitter Card
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ];

    twitterTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Meta viewport (mobile-friendly)
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      document.head.appendChild(metaViewport);
    }
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');

    // Meta charset
    let metaCharset = document.querySelector('meta[charset]');
    if (!metaCharset) {
      metaCharset = document.createElement('meta');
      metaCharset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(metaCharset, document.head.firstChild);
    }

    // Language
    document.documentElement.lang = 'fr';

    // Theme color
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }
    metaTheme.setAttribute('content', '#000000');

    // Favicon - Logo P (icône)
    let linkIcon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!linkIcon) {
      linkIcon = document.createElement('link');
      linkIcon.setAttribute('rel', 'icon');
      document.head.appendChild(linkIcon);
    }
    linkIcon.setAttribute('type', 'image/png');
    linkIcon.setAttribute('href', logoP);

    // Apple Touch Icon - Logo P
    let linkApple = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (!linkApple) {
      linkApple = document.createElement('link');
      linkApple.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(linkApple);
    }
    linkApple.setAttribute('href', logoP);

    // Manifest link
    let linkManifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (!linkManifest) {
      linkManifest = document.createElement('link');
      linkManifest.setAttribute('rel', 'manifest');
      document.head.appendChild(linkManifest);
    }
    linkManifest.setAttribute('href', '/manifest.json');

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "PixelBoost",
      "image": ogImage,
      "description": description,
      "url": url,
      "telephone": "+33785759040",
      "email": "pixelboost22@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "addressLocality": "Bordeaux",
        "addressRegion": "Nouvelle-Aquitaine",
        "postalCode": "33000"
      },
      "priceRange": "499€-999€",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "10"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Bordeaux"
        },
        {
          "@type": "State",
          "name": "Gironde"
        },
        {
          "@type": "State",
          "name": "Nouvelle-Aquitaine"
        },
        {
          "@type": "Country",
          "name": "France"
        }
      ],
      "serviceType": [
        "Création de sites web",
        "Développement web",
        "Design web",
        "Site vitrine",
        "Site e-commerce",
        "Application web"
      ],
      "offers": [
        {
          "@type": "Offer",
          "name": "Forfait Basique",
          "price": "499",
          "priceCurrency": "EUR",
          "description": "Site vitrine one-page avec design responsive et SEO optimisé"
        },
        {
          "@type": "Offer",
          "name": "Forfait Populaire",
          "price": "749",
          "priceCurrency": "EUR",
          "description": "Site multi-pages avec design sur mesure et animations"
        },
        {
          "@type": "Offer",
          "name": "Forfait Premium",
          "price": "999",
          "priceCurrency": "EUR",
          "description": "Site complet avec e-commerce, animations 3D et CMS sur mesure"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/pixel.boost.web/",
        "https://www.facebook.com/profile.php?id=61579858910169"
      ]
    };

    let scriptLD = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptLD) {
      scriptLD = document.createElement('script');
      scriptLD.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptLD);
    }
    scriptLD.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, url]);

  return null;
}
