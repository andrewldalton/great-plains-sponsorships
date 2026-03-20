export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Great Plains Sponsorships, Inc.",
    description:
      "Midwest-based sponsorship experts creating profitable, sustainable naming rights and corporate partnerships for sports complexes, municipalities, nonprofits, and entertainment venues.",
    url: "https://greatplainssponsorships.com",
    telephone: "+1-402-657-8170",
    email: "Ryan.Querry@GreatPlainsSponsorships.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "18919 Margo St.",
      addressLocality: "Omaha",
      addressRegion: "NE",
      postalCode: "68136",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.1747,
      longitude: -96.1417,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 41.2565,
        longitude: -95.9345,
      },
      geoRadius: "800 mi",
    },
    founder: {
      "@type": "Person",
      name: "Ryan Querry",
      jobTitle: "Founder & President",
    },
    foundingLocation: {
      "@type": "Place",
      name: "Omaha, Nebraska",
    },
    knowsAbout: [
      "Naming Rights",
      "Corporate Sponsorship",
      "Pouring Rights",
      "Sports Venue Sponsorship",
      "Municipal Partnerships",
      "Owner's Representation",
      "Premium Seating",
      "VIP Event Coordination",
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://greatplainssponsorships.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Naming Rights & Sponsorship Consulting",
    provider: {
      "@type": "LocalBusiness",
      name: "Great Plains Sponsorships, Inc.",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sponsorship Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Naming Rights & Sponsorships",
            description:
              "Complete naming rights procurement and corporate partnership development with a clutter-free, less-is-more approach.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Owner's Representation",
            description:
              "Pre-construction through post-opening management including procurement, design, and vendor partnerships.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pouring Rights",
            description:
              "Maximize revenue through new and existing pouring and beverage contracts with major brands.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
