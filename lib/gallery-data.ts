export interface Photo {
  src: string;
  alt: string;
}

export interface EventAlbum {
  slug: string;
  name: string;
  date: string;
  description: string;
  coverImage: string;
  photoCount: number;
  photos: Photo[];
}

export interface GalleryCategory {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  photoCount: number;
  photos: Photo[];
}

/**
 * Generate an array of Photo objects for a given public/photos subfolder.
 * Files are numbered 1.jpg, 2.jpg, ... as produced by copy-photos.ps1.
 */
function makePhotos(folder: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/photos/${folder}/${i + 1}.jpg`,
    alt: `${folder.replace(/-/g, ' ')} photo ${i + 1}`,
  }));
}

/** Chronological event albums with real photos from Photos/ directory */
export const EVENTS: EventAlbum[] = [
  {
    slug: "lamp-lighting-2024-25",
    name: "Lamp Lighting Ceremony 2024-25",
    date: "2024",
    description:
      "The solemn and inspiring Lamp Lighting ceremony marking the beginning of the nursing journey for our new batch of students — a tradition that symbolises the light of knowledge, compassion, and service.",
    coverImage: "/photos/lamp-lighting-photo-2024-25/1.jpg",
    photoCount: 53,
    photos: makePhotos("lamp-lighting-photo-2024-25", 53),
  },
  {
    slug: "independence-day",
    name: "Independence Day Celebration",
    date: "15 August",
    description:
      "Patriotic celebration of India's Independence Day at Swami Vivekanand School of Nursing — flag hoisting, cultural performances, and the spirit of national pride.",
    coverImage: "/photos/15-august/1.jpg",
    photoCount: 2,
    photos: makePhotos("15-august", 2),
  },
  {
    slug: "republic-day",
    name: "Republic Day Celebration",
    date: "26 January",
    description:
      "Vibrant Republic Day celebrations honouring the Constitution of India with cultural programmes, parade participation, and the hoisting of the national flag.",
    coverImage: "/photos/26-january/1.jpg",
    photoCount: 7,
    photos: makePhotos("26-january", 7),
  },
  {
    slug: "aids-awareness-day",
    name: "AIDS Awareness Day",
    date: "1 December",
    description:
      "World AIDS Day awareness programme — nursing students lead community health education drives, promoting awareness, prevention, and compassionate support.",
    coverImage: "/photos/aids-day-photo/1.jpg",
    photoCount: 6,
    photos: makePhotos("aids-day-photo", 6),
  },
  {
    slug: "cne-workshop",
    name: "CNE Workshop",
    date: "2025",
    description:
      "Continuing Nursing Education workshop bringing together healthcare professionals for skill enhancement, case discussions, and sharing of current clinical practices.",
    coverImage: "/photos/cne-workshop/1.jpg",
    photoCount: 9,
    photos: makePhotos("cne-workshop", 9),
  },
  {
    slug: "college-activities",
    name: "College Activities",
    date: "2024-25",
    description:
      "A glimpse into the vibrant campus life — student activities, extracurricular events, and everyday moments that make Swami Vivekanand School of Nursing a thriving community.",
    coverImage: "/photos/college-activities/1.jpg",
    photoCount: 1,
    photos: makePhotos("college-activities", 1),
  },
  {
    slug: "external-education-visit",
    name: "External Education Visit",
    date: "2024-25",
    description:
      "Students explore hospitals, community health centres, and healthcare facilities during supervised external education visits — bridging classroom knowledge with real-world practice.",
    coverImage: "/photos/external-education-visit/1.jpg",
    photoCount: 6,
    photos: makePhotos("external-education-visit", 6),
  },
  {
    slug: "gnm-practical-posting",
    name: "GNM Practical Posting",
    date: "2024-25",
    description:
      "Clinical rotations and hospital postings — students in action, developing hands-on nursing skills under clinical supervision across medical and surgical wards.",
    coverImage: "/photos/gnm-practical-posting/1.jpg",
    photoCount: 11,
    photos: makePhotos("gnm-practical-posting", 11),
  },
  {
    slug: "gandhi-jayanti",
    name: "Gandhi Jayanti Event",
    date: "2 October",
    description:
      "Commemorating the birth anniversary of Mahatma Gandhi — cultural events, speeches, and activities celebrating his timeless values of non-violence, service, and compassion.",
    coverImage: "/photos/mahatma-gandhi-jayanti-event-photo/1.jpg",
    photoCount: 8,
    photos: makePhotos("mahatma-gandhi-jayanti-event-photo", 8),
  },
  {
    slug: "nutrition-day",
    name: "Nutrition Day",
    date: "2024-25",
    description:
      "Promoting awareness of balanced nutrition and healthy living through demonstrations, dietary counselling activities, and patient education sessions led by nursing students.",
    coverImage: "/photos/nutration-day-photo/1.jpg",
    photoCount: 7,
    photos: makePhotos("nutration-day-photo", 7),
  },
  {
    slug: "yoga-day",
    name: "International Yoga Day",
    date: "21 June",
    description:
      "Celebrating International Yoga Day with campus-wide yoga sessions — promoting physical fitness, mental well-being, and holistic health awareness among students and staff.",
    coverImage: "/photos/yoga-day/1.jpg",
    photoCount: 4,
    photos: makePhotos("yoga-day", 4),
  },
];

/** Campus and facility photos for the Gallery page */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    slug: "institute-building",
    name: "Institute Building",
    description:
      "The impressive campus of Swami Vivekanand School of Nursing — purpose-built for excellence in nursing education.",
    coverImage: "/photos/institute-building-front-view/1.jpg",
    photoCount: 8,
    photos: makePhotos("institute-building-front-view", 8),
  },
  {
    slug: "classrooms",
    name: "Classrooms",
    description:
      "Spacious, well-lit classrooms designed to foster focused learning and collaborative academic discussions.",
    coverImage: "/photos/classrooms/1.jpg",
    photoCount: 4,
    photos: makePhotos("classrooms", 4),
  },
  {
    slug: "foundation-nursing-lab",
    name: "Foundation of Nursing Lab",
    description:
      "State-of-the-art simulation laboratory where students practise core nursing skills on advanced mannequins and models.",
    coverImage: "/photos/foundation-of-nursing-lab/1.jpg",
    photoCount: 2,
    photos: makePhotos("foundation-of-nursing-lab", 2),
  },
  {
    slug: "library",
    name: "Library",
    description:
      "Well-stocked library with comprehensive nursing and medical literature, e-journals, and quiet study spaces.",
    coverImage: "/photos/labrary/1.jpg",
    photoCount: 2,
    photos: makePhotos("labrary", 2),
  },
  {
    slug: "pre-clinical-lab",
    name: "Pre-Clinical Laboratory",
    description:
      "Pre-clinical laboratory equipped with foundational instruments for anatomy, physiology, and biochemistry practicals.",
    coverImage: "/photos/pre-clinical-lab/1.jpg",
    photoCount: 3,
    photos: makePhotos("pre-clinical-lab", 3),
  },
];

/** Director photos — used in About and Messages pages */
export const DIRECTOR_PHOTOS: Photo[] = makePhotos("chandrakant-jadhav", 2);
