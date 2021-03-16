export default {
  APPROVE_ARTIST: 1,
  DISAPPROVE_ARTIST: 2,
  REJECT_ARTIST: 4,

  ENABLE_USER: 1,
  DISABLE_USER: 0,

  ARTIST_TYPE_REGULAR:0,
  ARTIST_TYPE_FEATURED:1,

  TABLE_ARTIST_LISTING: 'ARTIST_LISTING',
  TABLE_USER_LISTING: 'USER_LISTING',

  //Artist Request Types
  ARTIST_REQUEST_TYPE_PENDING: 0,
  ARTIST_REQUEST_TYPE_APPROVED: 1,
  ARTIST_REQUEST_TYPE_DISAPPROVED: 2,
  ARTIST_REQUEST_TYPE_REAPPLIED: 3,
  ARTIST_REQUEST_TYPE_REJECTED: 4,

  //Codes for changing media status
  ACTION_REJECT_MEDIA: 2,
  ACTION_APPROVE_MEDIA: 1,
  ACTION_DELETE_MEDIA: 3,

  STATUS_REJECTED_MEDIA: 2,
  STATUS_APPROVED_MEDIA: 1,
  STATUS_PENDING_MEDIA: 0,

  //Registration types
  SIGN_UP_TYPE_EMAIL: 1,
  SIGN_UP_TYPE_PHONE: 2,
  SIGN_UP_TYPE_FACEBOOK: 3,
  SIGN_UP_TYPE_GOOGLE: 4,
  SIGN_UP_TYPE_APPLE: 5,

  //Promo Types
  PROMO_TYPE_NORMAL: 1,
  PROMO_TYPE_AMBASSADOR: 2,
  PROMO_TYPE_GIFT: 3,

  UPDATE_ARTIST: 'UPDATE_ARTIST',
  UPDATE_USER: 'UPDATE_USER',
  SEND_PUSH_NOTIFICATION: 'SEND_PUSH_NOTIFICATION',
  ENABLE_DISABLE_USER: 'ENABLE_DISABLE_USER',

  MEDIA_UPLOAD_IMAGE: 0,
  MEDIA_UPLOAD_VIDEO: 2,
  MEDIA_TYPE_GALLERY: 1,
  MEDIA_TYPE_COVER: 2,
  UPLOAD_TYPE_ARTIST_PROFILE_MEDIA: 1,
  UPLOAD_TYPE_OTHER: 2,

  ALLOWED_FILE_FORMATS_GALLERY:
    '.jpeg, .jpg, .png, .mp4, .mov, .avi, .mpeg, .flv, .heic,',

  ALLOWED_FILE_FORMATS_CERTIFICATES: '.jpeg, .jpg, .png',

  //Artist Profile Questionnaire
  QUES_EXPERIENCE_IN_YEARS: 'How many years have you worked on a client?',
  QUES_TRAINING:
    'Have you attended any makeup or skincare training, classes or workshops?',
  QUES_RACE_SPECIALIZATION:
    'What race/origin/skin-tone do you specialize in working with (if any)?',
  QUES_SPECIALITIES: 'Select your specialities',
  QUES_IDEAL_CLIENT_AGE: 'Select the Age Group for your Ideal Client',
  QUES_BRAND_PREF: 'What types of brands do your prefer working with?',
  QUES_CLIENT_EXP_PREF: 'Which type of client are you comfortable teaching?',
  QUES_GENDER_PREF: 'Which gender do you prefer/have experience working with',
  QUES_LICENSE: 'Are you licensed in any of the following',

  GENDER_PREFERENCE: 'gender_preference',
  EXPERIENCE_IN_YEARS: 'exp_in_years',
  PREFERRED_AGE_GROUP: 'preferred_age_group',
  RACE_SPECIALIZATION: 'race_specialization',
  BRANDS_WORKED_WITH: 'brands_worked_with',
  CLIENT_EXPERIENCE_PREFERENCE: 'client_exp_preference',
  SPECIALITIES: 'specialities',
  LICENSES: 'licences',
  TRAINING_NAME: 'training_name',
  TRAINING_LOCATION: 'training_location',
  TRAINING_DATE: 'training_date',
  FACEBOOK_LINK: 'facebook_link',
  WEBSITE_LINK: 'website_link',
  INSTAGRAM_LINK: 'instagram_link',
  YOUTUBE_LINK: 'youtube_link',
  PINTEREST_LINK: 'pinterest_link',

  MEDIA_FORMAT_IMAGE: 1,
  MEDIA_FORMAT_VIDEO: 2,

  UPLOAD_FORMAT_IMAGE: 1,
  UPLOAD_FORMAT_AUDIO: 0,
  UPLOAD_FORMAT_VIDEO: 2,

  MEDIA_UPLOAD_LIMIT: 5,
  CERTIFICATES_LIMIT: 5,

  // ----------BOOKING STATUS------------

  //Booking Status Codes
  CODE_BOOKING_PENDING: 1,
  CODE_BOOKING_ACCEPTED: 2,
  CODE_BOOKING_REJECTED: 3,
  CODE_BOOKING_COMPLETE: 4,
  CODE_BOOKING_CANCELLED: 5,

  ACTION_BOKING_CANCEL: 'ACTION_BOOKING_CANCEL',
  ACTION_BOKING_COMPLETE: 'ACTION_BOOKING_COMPLETE',

  //Booking cancel reason type
  REASON_TYPE_OTHER: 23,

  //Device Type
  DEVICE_TYPE_ANDROID: 1,
  DEVICE_TYPE_IOS: 2,

  //Sort Order
  SORT_ORDER_ASC: 0,
  SORT_ORDER_DESC: 1,

  //Promo Codes status
  PROMO_STATUS_ACTIVE: 1,
  PROMO_STATUS_EXPIRED: 0,

  //Sections
  PENDING_MEDIA_SECTION: 'PENDING_MEDIA_SECTION',
  APPROVED_MEDIA_SECTION: 'APPROVED_MEDIA_SECTION',
  REJECTED_MEDIA_SECTION: 'REJECTED_MEDIA_SECTION',
  PROMO_CODES_SECTION: 'PROMO_CODES_SECTION',
  BASIC_DETAILS_SECTION: 'BASIC_DETAILS_SECTION',

  EARNINGS_YEARLY: 1,
  EARNINGS_MONTHLY: 2,

  //Years worked on client  : exp_in_years
  exp_in_years: {
    '10001': '1-3',
    '10002': '4-6',
    '10003': '7-9',
    '10004': '10+',
  },
  '10001': '1-3',
  '10002': '4-6',
  '10003': '7-9',
  '10004': '10+',

  // preferred_age_group
  preferred_age_group: {
    '1001': '16-24',
    '1002': '25-44',
    '1003': '45-64',
    '1004': '65+',
  },
  '1001': '16-24',
  '1002': '25-44',
  '1003': '45-64',
  '1004': '65+',

  //gender_preference
  gender_preference: {
    '2001': 'Male',
    '2002': 'Female',
    '2003': 'Non-Binary/Third Gender',
    '2004': 'Transgender Female',
    '2005': 'Transgender Male',
    '2006': 'Other',
    // '2007': 'All',
  },
  '2001': 'Male',
  '2002': 'Female',
  '2003': 'Non-Binary/Third Gender',
  '2004': 'Transgender Female',
  '2005': 'Transgender Male',
  '2006': 'Other',
  '2007': 'All',
  GENDER_PREF_ALL: '2007',

  //race_specialization
  race_specialization: {
    '3001': 'American Indian or Alaska Native',
    '3002': 'Asian',
    '3003': 'Black or African American',
    '3004': 'Hispanic, Latino or Spanish origin ',
    '3005': 'Native Hawaiian or Other Pacific Islander ',
    '3006': 'White ',
    '3007': 'Other',
  },
  '3001': 'American Indian or Alaska Native',
  '3002': 'Asian',
  '3003': 'Black or African American',
  '3004': 'Hispanic, Latino or Spanish origin ',
  '3005': 'Native Hawaiian or Other Pacific Islander ',
  '3006': 'White ',
  '3007': 'Other',
  //brands_worked_with (brands preference)
  brands_worked_with: {
    '4001': 'Luxury',
    '4002': 'Mid-Range',
    '4003': 'Drugstore',
    '4004': 'Indie',
    '4005': 'Other',
  },
  '4001': 'Luxury',
  '4002': 'Mid-Range',
  '4003': 'Drugstore',
  '4004': 'Indie',
  '4005': 'Other',
  //client_exp_preference (comfortable teaching)
  client_exp_preference: {
    '5001': 'Beginner',
    '5002': 'Intermediate',
    '5003': 'Advanced',
    '5004': 'Any of the above',
  },
  '5001': 'Beginner',
  '5002': 'Intermediate',
  '5003': 'Advanced',
  '5004': 'Any of the above',

  CLIENT_EXP_BEGINNER: '5001',
  CLIENT_EXP_INTERMEDIATE: '5002',
  CLIENT_EXP_ADVANCED: '5003',

  //specialities
  specialities: {
    '9001': 'Natural/Everyday Makeup',
    '9002': 'Bridal',
    '9003': 'Full Glam',
    '9004': 'Professional/Workplace Makeup',
    '9005': 'Photoshoot/Editorial',
    '9006': 'Special Effects (FX)',
    '9007': 'Mature Skin',
    '9008': 'Men’s Grooming/Facial Hair',
    '9009': 'Skin Concerns/Blemishes',
    '9010': 'BIPOC (Black, Indigenous & People of Color)',
  },
  '9001': 'Natural/Everyday Makeup',
  '9002': 'Bridal',
  '9003': 'Full Glam',
  '9004': 'Professional/Workplace Makeup',
  '9005': 'Photoshoot/Editorial',
  '9006': 'Special Effects (FX)',
  '9007': 'Mature Skin',
  '9008': 'Men’s Grooming/Facial Hair',
  '9009': 'Skin Concerns/Blemishes',
  '9010': 'BIPOC (Black, Indigenous & People of Color)',

  //licences
  licenses: {
    '11001': 'Esthetician',
    '11002': 'Cosmetology',
    '11003': 'Nail Tech',
    '11004': 'Other',
  },
  '11001': 'Esthetician',
  '11002': 'Cosmetology',
  '11003': 'Nail Tech',
  '11004': 'Other',
  '11005': 'No',

  LISTING_ENTRIES_NUM_OPTIONS: [5, 10, 15, 20],

  PROFIT_PERCENTAGE_VALUES: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ],
}
