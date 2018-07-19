/* @flow */

declare type GraphQLResponseRoot = {
  data?: Query | Mutation;
  errors?: Array<GraphQLResponseError>;
}

declare type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

declare type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}

declare type Query = {
  /** Gets the current viewer record */
  viewer: ?Viewer;
  relay: ?Query;
  applicationConfig: ?ApplicationConfig;
  listing: ?Listing;
  placeSearch: ?PlaceConnection;
}

/**
  Information about the current user
*/
declare type Viewer = {
  /** The ID of an object */
  id: string;
  userId: ?string;
  channel: ?string;
  analyticsId: ?string;
  name: ?string;
  firstName: ?string;
  lastName: ?string;
  email: ?string;
  emailVerified: ?boolean;
  mobile: ?string;
  mobileVerified: ?boolean;
  countryCode: ?string;
  imageUrl: ?string;
  lastLoginAt: ?string;
  identityProviders: ?Array<IdentityProvider>;
  smoochConfig: ?SmoochConfig;
  /** List of accounts for this viewer */
  accounts: ?AccountConnection;
  /** List of suggested account to create or join for this user */
  suggestedAccounts: ?AccountConnection;
  /** General account search */
  searchAccounts: ?AccountConnection;
  /** Gets viewers requests to join an account */
  joinAccountRequests: ?JoinAccountRequestConnection;
  timezone: ?string;
  preferences: ?UserPreferences;
  filePickerUploadPathForAvatar: ?string;
  applicationConfig: ?ApplicationConfig;
  isEmailAvailable: ?EmailAvailable;
  /** Resolves a universal shallow link to an entity given with related references */
  universalLinkInfo: ?UniversalLinkInfo;
  spaces: ?SpaceConnection;
  spaceFilters: ?Array<SpaceFilter>;
  beacon: ?Beacon;
}

declare type IdentityProvider = {
  provider: ?string;
  userId: ?string;
}

declare type SmoochConfig = {
  userId: ?string;
  authToken: ?string;
}

/**
  A connection to a list of items.
*/
declare type AccountConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<AccountEdge>;
}

/**
  Information about pagination in a connection.
*/
declare type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
  /** When paginating backwards, the cursor to continue. */
  startCursor: ?string;
  /** When paginating forwards, the cursor to continue. */
  endCursor: ?string;
}

/**
  An edge in a connection.
*/
declare type AccountEdge = {
  /** The item at the end of the edge */
  node: ?Account;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  An account on homepass
*/
declare type Account = {
  /** The ID of an object */
  id: string;
  accountId: ?string;
  /** Name of the account */
  name: ?string;
  /** A pubnub channel to listen on changes to account information */
  channel: ?string;
  status: ?string;
  type: ?string;
  imageUrl: ?string;
  imageUrlFilePickerUploadPath: ?string;
  phone: ?string;
  allowAutoJoin: ?boolean;
  privateListings: ?boolean;
  enableWelcomeSms: ?boolean;
  smsFrom: ?string;
  primaryColor: ?string;
  accentColor: ?string;
  timezone: ?string;
  geometry: ?Geometry;
  addressComponents: ?Array<AddressComponent>;
  /** This field can return an address string in any format requested by the client.

Example:
{{{streetNumber}}} {{streeName}} {{streetType}} will return a string in the format: '123 Fake St'

The format argument will take any valid mustache template. Only the following values will be replaced:

post_box

unitNo

unitNumber

unit_number

subpremise

streetNo

streetNumber

street_number

street

streetName

street_address

route

streetType

street_type

city

suburb

locality

administrative_area_level_2

sublocality

state

administrative_area_level_1

zip

postcode

postal_code

country

countryName

isoCountryCodeAlpha2

countryCode

 */
  addressFormatted: ?string;
  addressFormattedFull: ?string;
  /** List of listings for this account */
  listings: ?ListingConnection;
  /** List of listings you are following */
  followedListings: ?ListingConnection;
  offices: ?Array<Office>;
  /** membership for the viewer of this account */
  viewerMembership: ?AccountMembership;
  /** List of memberships for this account */
  memberships: ?AccountMembershipConnection;
  /** List of membership invites for this account */
  membershipInvites: ?AccountMembershipInviteConnection;
  /** List of CRM integrations for this account */
  crmIntegrations: ?AccountCrmIntegrationConnection;
  /** List of Integration Accounts related to the account */
  integrationAccounts: ?IntegrationAccountConnection;
  /** List available of CRM integrations for this account */
  availableCrmIntegrations: ?AccountCrmIntegrationConnection;
  /** a List of all opportunities created for this account */
  opportunities: ?OpportunityConnection;
  features: ?AccountFeatures;
  billing: ?Billing;
  /** General contact search */
  searchContacts: ?ContactConnection;
  /** Account contacts */
  contacts: ?ContactConnection;
  homeConnectionBranding: ?HomeConnectionBranding;
  /** Address books */
  addressBooks: ?AddressBookConnection;
  payoutAccount: ?ConnectPayoutAccount;
  /** Gets a list of application integrations for the account. */
  accountIntegrations: ?Array<ApplicationIntegrations>;
  /** Gets a list of application integrations for the account. */
  userIntegrations: ?Array<ApplicationIntegrations>;
  /** Returns the spaces for the given account */
  spaces: ?SpaceConnection;
}

declare type Geometry = {
  location: ?Location;
}

declare type Location = {
  lat: ?number;
  lng: ?number;
}

declare type AddressComponent = {
  longName: ?string;
  shortName: ?string;
  types: ?Array<string>;
}

declare type listingType = "LISTING_TYPE_SALE_ONLY" | "LISTING_TYPE_RENT_ONLY";

/**
  A connection to a list of items.
*/
declare type ListingConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<ListingEdge>;
}

/**
  An edge in a connection.
*/
declare type ListingEdge = {
  /** The item at the end of the edge */
  node: ?Listing;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  A dwelling to be brought or sold
*/
declare type Listing = {
  /** The ID of an object */
  id: string;
  listingId: ?string;
  spaceResourceTitle: ?string;
  spaceResourceSubtitle: ?string;
  spaceResourceDescription: ?string;
  spaceResourceAttachments: ?Array<Attachment>;
  channel: ?string;
  account: ?Account;
  /** A short description of the listing */
  description: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
  archivedAt: ?string;
  status: ?string;
  agents: ?Array<agent>;
  listingType: ?string;
  listingAgents: ?Array<listingAgent>;
  baths: ?string;
  beds: ?string;
  cars: ?string;
  imageUrl: ?string;
  imageUrls: ?Array<string>;
  title: ?string;
  references: ?Array<Reference>;
  integrations: ?Array<Integration>;
  availableIntegrations: ?Array<ExternalSystem>;
  addressComponents: ?Array<AddressComponent>;
  /** This field can return an address string in any format requested by the client.

Example:
{{{streetNumber}}} {{streeName}} {{streetType}} will return a string in the format: '123 Fake St'

The format argument will take any valid mustache template. Only the following values will be replaced:

post_box

unitNo

unitNumber

unit_number

subpremise

streetNo

streetNumber

street_number

street

streetName

street_address

route

streetType

street_type

city

suburb

locality

administrative_area_level_2

sublocality

state

administrative_area_level_1

zip

postcode

postal_code

country

countryName

isoCountryCodeAlpha2

countryCode

 */
  addressFormatted: ?string;
  geometry: ?Geometry;
  addressFormattedFull: ?string;
  addressFormattedShort: ?string;
  attachments: ?Array<Attachment>;
  activities: ?ActivityConnection;
  domainCheckinEnabled: ?boolean;
  domainUrl: ?string;
  checkins: ?CheckinConnection;
  contacts: ?ListingContactConnection;
  listingContacts: ?ListingContactConnection;
  contactCount: ?number;
  openForInspections: ?Array<OpenForInspection>;
  nextOfi: ?string;
  filePickerUploadPath: ?string;
  visitorReportUrl: ?string;
  viewerIsFollowing: ?boolean;
  brochureUrl: ?string;
  vendorReportUrl: ?string;
  rentalApplicationCount: ?number;
  /** a List of all opportunities created for this account */
  rentalApplicationOpportunities: ?OpportunityConnection;
  features: ?ListingFeatures;
  /** lists of all users that have access to this listing for this account */
  usersWithAccess: ?UserConnection;
  auctionDate: ?string;
  /** Lists all vendors for the given listings */
  vendors: ?VendorConnection;
  flaggedCount: ?number;
  checkinCount: ?number;
  floorPlanImageUrls: ?Array<string>;
  videoUrl: ?string;
  liveView: ?LiveViewSettings;
  priceToShow: ?string;
  soldPrice: ?string;
  branding: ?ListingBranding;
  /** Lists all calendar events for a listing. Includes all inspections. */
  calendarEvents: ?CalendarEventConnection;
  calendarEventSettings: ?CalendarEventSettingsForListing;
}

declare type SpaceResource = Listing;

declare type Attachment = {
  /** The ID of an object */
  id: string;
  attachmentId: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
  url: ?string;
  mimeType: ?string;
  name: ?string;
  sizeInBytes: ?number;
  ref: ?string;
  refSource: ?string;
}

declare type agent = {
  /** The ID of an object */
  id: string;
  agentId: ?string;
  name: ?string;
  email: ?string;
  imageUrl: ?string;
}

declare type listingAgent = {
  name: ?string;
  email: ?string;
  imageUrl: ?string;
  phone: ?string;
}

declare type Reference = {
  id: ?string;
  source: ?string;
}

declare type Integration = {
  listingIntegrationId: ?string;
  ref: ?string;
  refSource: ?string;
  imageUrl: ?string;
}

declare type ExternalSystem = {
  systemId: ?string;
  name: ?string;
}

/**
  A connection to a list of items.
*/
declare type ActivityConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<ActivityEdge>;
}

/**
  An edge in a connection.
*/
declare type ActivityEdge = {
  /** The item at the end of the edge */
  node: ?Activity;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type Activity = {
  /** The ID of an object */
  id: string;
  activityId: ?string;
  verb: ?string;
  time: ?string;
}

/**
  A connection to a list of items.
*/
declare type CheckinConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<CheckinEdge>;
}

/**
  An edge in a connection.
*/
declare type CheckinEdge = {
  /** The item at the end of the edge */
  node: ?Checkin;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type Checkin = {
  /** The ID of an object */
  id: string;
  ref: ?string;
  checkinId: ?string;
  checkinDate: ?string;
  deleted: ?boolean;
  contact: ?Contact;
  listingContact: ?ListingContact;
}

declare type Contact = {
  /** The ID of an object */
  id: string;
  contactId: ?string;
  mobile: ?string;
  landline: ?string;
  email: ?string;
  firstName: ?string;
  lastName: ?string;
  fullName: ?string;
  imageUrl: ?string;
  customer: ?Customer;
  visits: ?number;
  ref: ?string;
  address: ?string;
  addressComponents: ?Array<AddressComponent>;
  /** This field can return an address string in any format requested by the client.

Example:
{{{streetNumber}}} {{streeName}} {{streetType}} will return a string in the format: '123 Fake St'

The format argument will take any valid mustache template. Only the following values will be replaced:

post_box

unitNo

unitNumber

unit_number

subpremise

streetNo

streetNumber

street_number

street

streetName

street_address

route

streetType

street_type

city

suburb

locality

administrative_area_level_2

sublocality

state

administrative_area_level_1

zip

postcode

postal_code

country

countryName

isoCountryCodeAlpha2

countryCode

 */
  addressFormatted: ?string;
  /** List of activities for the contact */
  activities: ?ActivityConnection;
  /** List of notes for the contact */
  notes: ?NoteConnection;
  unsubscribeBroadcast: ?boolean;
  addresses: ?Array<vCardAddress>;
  telephones: ?Array<vCardTelephone>;
  emails: ?Array<vCardEmail>;
  relatedPeople: ?Array<vCardRelatedPerson>;
  organisationTitle: ?string;
  organisationRole: ?string;
  organisationName: ?string;
  organisationLogoUrl: ?string;
  /** List referenceIds associated with the contact */
  referenceIds: ?Array<Ref>;
  createdAt: ?string;
  modifiedAt: ?string;
}

declare type Customer = {
  /** The ID of an object */
  id: string;
  customerId: ?string;
  imageUrl: ?string;
}

/**
  A connection to a list of items.
*/
declare type NoteConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<NoteEdge>;
}

/**
  An edge in a connection.
*/
declare type NoteEdge = {
  /** The item at the end of the edge */
  node: ?Note;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type Note = {
  /** The ID of an object */
  id: string;
  noteId: ?string;
  text: ?string;
  listing: ?Listing;
  isVendorComment: ?boolean;
  shared: ?boolean;
  author: ?User;
  modified: ?string;
  viewerCanEdit: ?boolean;
}

declare type User = {
  /** The ID of an object */
  id: string;
  userId: ?string;
  layerId: ?string;
  name: ?string;
  firstName: ?string;
  lastName: ?string;
  email: ?string;
  emailVerified: ?boolean;
  mobile: ?string;
  mobileVerified: ?boolean;
  imageUrl: ?string;
  lastLoginAt: ?string;
}

declare type vCardAddress = {
  label: ?string;
  addressType: ?vCardAddressType;
  otherAddressType: ?string;
  geoLatitude: ?number;
  geoLongitude: ?number;
  pobox: ?string;
  street: ?string;
  locality: ?string;
  region: ?string;
  postcode: ?string;
  country: ?string;
  countryCode: ?string;
  addressComponents: ?Array<AddressComponent>;
}

declare type vCardAddressType = "home" | "work" | "other";

declare type vCardTelephone = {
  telephoneType: vCardTelephoneType;
  telephoneLabel: ?string;
  number: any;
}

declare type vCardTelephoneType = "cell" | "voice" | "fax";

declare type vCardEmail = {
  emailType: vCardEmailType;
  otherEmailType: ?string;
  email: any;
}

declare type vCardEmailType = "work" | "home" | "other";

declare type vCardRelatedPerson = {
  firstName: string;
  lastName: ?string;
  relationType: vCardRelatedPersonType;
  otherRelatedPersonType: ?string;
  contactId: ?string;
}

declare type vCardRelatedPersonType = "contact" | "acquaintance" | "parent" | "brother" | "sister" | "child" | "friend" | "spouse" | "partner" | "assistant" | "manager" | "other";

declare type Ref = {
  refId: string;
  refSource: string;
}

declare type ListingContact = {
  /** The ID of an object */
  id: string;
  contact: ?Contact;
  visits: ?number;
  lastVisit: ?string;
  noteCount: ?number;
  flagged: ?boolean;
  hasSentDocs: ?boolean;
  checkins: ?CheckinConnection;
}

/**
  A connection to a list of items.
*/
declare type ListingContactConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<ListingContactEdge>;
}

/**
  An edge in a connection.
*/
declare type ListingContactEdge = {
  /** The item at the end of the edge */
  node: ?ListingContact;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type OpenForInspection = {
  startDate: ?string;
  endDate: ?string;
}

/**
  A connection to a list of items.
*/
declare type OpportunityConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<OpportunityEdge>;
}

/**
  An edge in a connection.
*/
declare type OpportunityEdge = {
  /** The item at the end of the edge */
  node: ?Opportunity;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  Provides information about the status of a given opportunity
*/
declare type Opportunity = RentalApplicationOpportunity | HomeConnectionOpportunity;

declare type ListingFeatures = {
  kiosk: ?Feature;
  sendWelcomeSMS: ?Feature;
  customBrochureBranding: ?Feature;
  rentalApplications: ?Feature;
  manageAccessForListing: ?Feature;
  setDomainCheckinEnabled: ?Feature;
  broadcastMessagingEnabled: ?Feature;
  liveViewEnabled: ?Feature;
  vendorManagement: ?Feature;
  liveViewActivities: ?Feature;
  autoNotifyVendors: ?Feature;
  homeLoanReferralsEnabled: ?Feature;
  bookingsEnabled: ?Feature;
  bookingsByOpenInspection: ?Feature;
  bookingByRequest: ?Feature;
}

declare type Feature = {
  name: ?string;
  enabled: ?boolean;
  descriptionWhenDisabled: ?string;
  hideWhenDisabled: ?boolean;
  disabledType: ?string;
}

/**
  A connection to a list of items.
*/
declare type UserConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<UserEdge>;
}

/**
  An edge in a connection.
*/
declare type UserEdge = {
  /** The item at the end of the edge */
  node: ?User;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  A connection to a list of items.
*/
declare type VendorConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<VendorEdge>;
}

/**
  An edge in a connection.
*/
declare type VendorEdge = {
  /** The item at the end of the edge */
  node: ?Vendor;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  A vendor for a property
*/
declare type Vendor = {
  /** The ID of an object */
  id: string;
  vendorId: ?string;
  contact: ?Contact;
  listing: ?Listing;
  status: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
}

declare type LiveViewSettings = {
  autoNotifyVendors: ?boolean;
  previewUrl: ?string;
  showDocsSentActivities: ?boolean;
  showNoteActivities: ?boolean;
}

declare type ListingBranding = {
  primaryColor: ?string;
  accentColor: ?string;
  agencyLogoUrl: ?string;
}

/**
  A connection to a list of items.
*/
declare type CalendarEventConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<CalendarEventEdge>;
}

/**
  An edge in a connection.
*/
declare type CalendarEventEdge = {
  /** The item at the end of the edge */
  node: ?CalendarEvent;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type CalendarEvent = {
  /** The ID of an object */
  id: string;
  name: ?string;
  calendarEventId: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
  type: ?string;
  status: ?string;
  startDate: ?string;
  endDate: ?string;
  visibility: ?string;
  listing: ?Listing;
  /** Lists all attendees for this event. */
  attendees: ?AttendeeConnection;
}

/**
  A connection to a list of items.
*/
declare type AttendeeConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<AttendeeEdge>;
}

/**
  An edge in a connection.
*/
declare type AttendeeEdge = {
  /** The item at the end of the edge */
  node: ?Attendee;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type Attendee = {
  /** The ID of an object */
  id: string;
  attendeeId: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
  name: ?string;
  email: ?string;
  mobile: ?string;
  imageUrl: ?string;
  status: ?string;
  contact: ?Contact;
  calendarEvent: ?CalendarEvent;
  checkin: ?Checkin;
}

declare type CalendarEventSettingsForListing = {
  duration: ?Duration;
  allowedCalendarEventRequest: ?allowedCalendarEventRequestType;
}

declare type Duration = {
  amount: ?number;
  unit: ?durationUnit;
}

declare type durationUnit = "SECONDS" | "MINUTES" | "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

declare type allowedCalendarEventRequestType = "PUBLIC_ONLY" | "PUBLIC_PRIVATE";

/**
  A real estate office
*/
declare type Office = {
  /** The ID of an object */
  id: string;
  officeId: ?string;
  /** Name of the office */
  name: ?string;
  /** office ingest feed */
  ingestFeeds: ?Array<IngestFeed>;
}

declare type IngestFeed = {
  id: ?string;
  externalSystemId: ?string;
  name: ?string;
  lastRun: ?string;
  imageUrl: ?string;
}

/**
  A users membership for an account
*/
declare type AccountMembership = {
  /** The ID of an object */
  id: string;
  accountMembershipId: ?string;
  user: ?User;
  role: ?string;
  status: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
}

/**
  A connection to a list of items.
*/
declare type AccountMembershipConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<AccountMembershipEdge>;
}

/**
  An edge in a connection.
*/
declare type AccountMembershipEdge = {
  /** The item at the end of the edge */
  node: ?AccountMembership;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  A connection to a list of items.
*/
declare type AccountMembershipInviteConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<AccountMembershipInviteEdge>;
}

/**
  An edge in a connection.
*/
declare type AccountMembershipInviteEdge = {
  /** The item at the end of the edge */
  node: ?AccountMembershipInvite;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  An invite to join an account
*/
declare type AccountMembershipInvite = {
  /** The ID of an object */
  id: string;
  accountMembershipInviteId: ?string;
  /** User that requested the invitee to join the account */
  invitedByUser: ?User;
  /** Person that was sent the invite to join the account */
  invitee: ?AccountMembershipInvitee;
  status: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
}

/**
  The person that has been invited to an account
*/
declare type AccountMembershipInvitee = {
  name: ?string;
  email: ?string;
}

/**
  A connection to a list of items.
*/
declare type AccountCrmIntegrationConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<AccountCrmIntegrationEdge>;
}

/**
  An edge in a connection.
*/
declare type AccountCrmIntegrationEdge = {
  /** The item at the end of the edge */
  node: ?AccountCrmIntegration;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type AccountCrmIntegration = {
  /** The ID of an object */
  id: string;
  officeId: ?string;
  externalSystemId: ?string;
  name: ?string;
  imageUrl: ?string;
  lastPolled: ?string;
  firstPolled: ?string;
}

/**
  A connection to a list of items.
*/
declare type IntegrationAccountConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<IntegrationAccountEdge>;
}

/**
  An edge in a connection.
*/
declare type IntegrationAccountEdge = {
  /** The item at the end of the edge */
  node: ?IntegrationAccount;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type IntegrationAccount = {
  /** The ID of an object */
  id: string;
  integrationAccountId: string;
  application: Application;
  status: IntegrationAccountStatus;
  requestedScopes: ?Array<string>;
  createdAt: string;
}

declare type Application = {
  /** The ID of an object */
  id: string;
  applicationId: string;
  name: string;
  sourceId: string;
  authStrategy: AuthStrategyEnum;
}

declare type AuthStrategyEnum = "unsupported" | "password" | "oauth2";

declare type IntegrationAccountStatus = "active" | "inactive" | "disabled";

declare type AccountFeatures = {
  setWelcomeSMS: ?Feature;
  setCustomBrochureBranding: ?Feature;
  manageHomeConnections: ?Feature;
  rentalApplicationManagement: ?Feature;
  billingManagement: ?Feature;
  contactsEnabled: ?Feature;
  bookingManagement: ?Feature;
  phoneAddressBookIntegration: ?Feature;
}

/**
  Contains all billing information related to an account
*/
declare type Billing = {
  initialized: ?boolean;
  planId: ?string;
  canViewPlans: ?boolean;
  selectablePlans: ?Array<string>;
  billingUrl: ?string;
  canManage: ?boolean;
  portalUrl: ?string;
  updatePaymentUrl: ?string;
  email: ?string;
  creditCardLastFour: ?string;
  trialEnd: ?string;
}

/**
  A connection to a list of items.
*/
declare type ContactConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<ContactEdge>;
}

/**
  An edge in a connection.
*/
declare type ContactEdge = {
  /** The item at the end of the edge */
  node: ?Contact;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  The branding that should be used in the home connection applet
*/
declare type HomeConnectionBranding = {
  primaryColor: ?string;
  accentColor: ?string;
  agencyLogoUrl: ?string;
  headerImage: ?string;
  phone: ?string;
}

/**
  A connection to a list of items.
*/
declare type AddressBookConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<AddressBookEdge>;
}

/**
  An edge in a connection.
*/
declare type AddressBookEdge = {
  /** The item at the end of the edge */
  node: ?AddressBook;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type AddressBook = {
  /** The ID of an object */
  id: string;
  addressBookId: string;
  name: string;
  /** Address book contacts */
  contacts: ?ContactConnection;
}

declare type ConnectPayoutAccount = {
  bsb: ?string;
  accountNumber: ?string;
  accountName: ?string;
}

/**
  Denotes the application-integrationAccounts pair where integration account is populated if there is an integration account associated with the application
*/
declare type ApplicationIntegrations = {
  /** The ID of an object */
  id: string;
  /** The configured integration account belonging to the application */
  integrationAccounts: ?Array<IntegrationAccount>;
  /** The application to configure. */
  application: Application;
}

/**
  A connection to a list of items.
*/
declare type SpaceConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<SpaceEdge>;
}

/**
  An edge in a connection.
*/
declare type SpaceEdge = {
  /** The item at the end of the edge */
  node: ?Space;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type Space = {
  /** The ID of an object */
  id: string;
  spaceId: ?string;
  title: ?string;
  subtitle: ?string;
  contacts: ?SpaceContactConnection;
  members: ?SpaceMemberConnection;
  memberRequests: ?SpaceMemberRequestConnection;
  viewerMember: ?SpaceMember;
  viewerMemberRequest: ?SpaceMemberRequest;
  visibility: SpaceVisibility;
  attachments: ?Array<Attachment>;
  url: ?string;
  /** Returns the primary (first) resource */
  primaryResource: ?SpaceResource;
  /** Contextual data attached to the space */
  resources: ?Array<SpaceResource>;
  imageUrl: ?string;
  archivedAt: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
  calendarEvents: ?CalendarEventConnection;
  nextEvent: ?CalendarEvent;
  geometry: ?Geometry;
  tags: ?Array<string>;
  suggestedMembers: ?Array<User>;
}

/**
  A connection to a list of items.
*/
declare type SpaceContactConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<SpaceContactEdge>;
}

/**
  An edge in a connection.
*/
declare type SpaceContactEdge = {
  /** The item at the end of the edge */
  node: ?SpaceContact;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type SpaceContact = {
  /** The ID of an object */
  id: string;
  contact: ?Contact;
  interested: ?boolean;
}

/**
  A connection to a list of items.
*/
declare type SpaceMemberConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<SpaceMemberEdge>;
}

/**
  An edge in a connection.
*/
declare type SpaceMemberEdge = {
  /** The item at the end of the edge */
  node: ?SpaceMember;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type SpaceMember = {
  /** The ID of an object */
  id: string;
  spaceMemberId: ?string;
  user: ?User;
  role: ?SpaceMemberRole;
  createdAt: ?string;
}

declare type SpaceMemberRole = "ADMIN" | "MEMBER" | "GUEST";

/**
  A connection to a list of items.
*/
declare type SpaceMemberRequestConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<SpaceMemberRequestEdge>;
}

/**
  An edge in a connection.
*/
declare type SpaceMemberRequestEdge = {
  /** The item at the end of the edge */
  node: ?SpaceMemberRequest;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type SpaceMemberRequest = {
  /** The ID of an object */
  id: string;
  spaceMemberRequestId: ?string;
  user: ?User;
  createdAt: ?string;
}

declare type SpaceVisibility = "OPEN" | "PRIVATE" | "SECRET";

/**
  A connection to a list of items.
*/
declare type JoinAccountRequestConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<JoinAccountRequestEdge>;
}

/**
  An edge in a connection.
*/
declare type JoinAccountRequestEdge = {
  /** The item at the end of the edge */
  node: ?JoinAccountRequest;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type JoinAccountRequest = {
  /** The ID of an object */
  id: string;
  requestId: ?string;
  accountId: ?string;
  officeIds: ?Array<string>;
  accountName: ?string;
  status: ?string;
  createdAt: ?string;
  modifiedAt: ?string;
  address: ?string;
}

declare type UserPreferences = {
  defaultAccount: ?Account;
  virtualAssistant: ?VirtualAssistantPreference;
  notifications: ?NotificationPreference;
}

declare type VirtualAssistantPreference = {
  enabled: ?boolean;
  dailySummary: ?boolean;
  weeklySummary: ?boolean;
  OFIsReminders: ?boolean;
  inspectionWrapUp: ?boolean;
}

declare type NotificationPreference = {
  push: ?NotificationPushPreference;
  email: ?NotificationEmailPreference;
}

declare type NotificationPushPreference = {
  enabled: ?boolean;
  messages: ?boolean;
  checkins: ?boolean;
  ofis: ?boolean;
}

declare type NotificationEmailPreference = {
  enabled: ?boolean;
  unreadMessages: ?boolean;
  weeklySummary: ?boolean;
  announcements: ?boolean;
}

declare type ApplicationConfig = {
  filePickerApiKey: ?string;
  homepassWebUrl: ?string;
  homepassBrochureUrl: ?string;
  homepassApiUrl: ?string;
  auth0ClientId: ?string;
  layerDelegationUrl: ?string;
  layerAppId: ?string;
  pubnubSubscribeKey: ?string;
}

declare type EmailAvailable = {
  isAvailable: ?boolean;
  takenByMobile: ?string;
  takenByName: ?string;
  takenByImageUrl: ?string;
}

declare type UniversalLinkInfo = {
  navigateTo: ?string;
  account: ?Account;
  isAccountMember: ?boolean;
  entityReferences: ?Array<EntityReference>;
}

declare type EntityReference = {
  entityId: ?string;
  entityType: ?string;
  /** The ID of an object */
  id: string;
  nodeId: ?string;
  displayName: ?string;
}

declare type SpaceFilter = {
  label: ?string;
  tag: ?string;
}

declare type Beacon = {
  /** The ID of an object */
  id: string;
  uuid: ?string;
  major: ?number;
  minor: ?number;
}

/**
  A connection to a list of items.
*/
declare type PlaceConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: ?Array<PlaceEdge>;
}

/**
  An edge in a connection.
*/
declare type PlaceEdge = {
  /** The item at the end of the edge */
  node: ?Place;
  /** A cursor for use in pagination */
  cursor: string;
}

declare type Place = {
  /** The ID of an object */
  id: string;
  fullAddress: ?string;
  firstLine: ?string;
  secondLine: ?string;
  addressComponents: ?Array<AddressComponent>;
}

declare type Mutation = {
  updateViewer: ?UpdateViewerPayload;
  autoJoinExistingAccounts: ?AutoJoinExistingAccountsPayload;
  updateContact: ?UpdateContactPayload;
  addContact: ?AddContactPayload;
  addAccountContact: ?AddAccountContactPayload;
  addEmailToUserForAuth0Jwt: ?AddEmailToUserForAuth0JwtPayload;
  addMobileToUserForAuth0Jwt: ?AddMobileToUserForAuth0JwtPayload;
  unsubscribeBroadcast: ?unsubscribeBroadcastPayload;
  createAccount: ?CreateAccountPayload;
  updateAccount: ?UpdateAccountPayload;
  updateAccountMembership: ?UpdateAccountMembershipPayload;
  removeAccountMembership: ?RemoveAccountMembershipPayload;
  createAccountMembershipInvite: ?CreateAccountMembershipInvitePayload;
  removeAccountMembershipInvite: ?RemoveAccountMembershipInvitePayload;
  acceptAccountMembershipInvite: ?AcceptAccountMembershipInvitePayload;
  requestAccountCrmIntegration: ?RequestAccountCrmIntegrationPayload;
  setupBillingForAccount: ?SetupBillingForAccountPayload;
  activatePlanForAccount: ?ActivatePlanForAccountPayload;
  updateBillingEmailForAccount: ?UpdateBillingEmailForAccountPayload;
  addAttendee: ?AddAttendeePayload;
  setAttendeeStatus: ?SetAttendeeStatusPayload;
  linkAttendeeToContact: ?LinkAttendeeToContactPayload;
  linkAttendeeToCheckin: ?LinkAttendeeToCheckinPayload;
  addCalendarEvent: ?AddCalendarEventPayload;
  requestCalendarEvent: ?RequestCalendarEventPayload;
  updateCalendarEvent: ?UpdateCalendarEventPayload;
  addCheckin: ?AddCheckinPayload;
  removeCheckin: ?RemoveCheckinPayload;
  addListingAttachments: ?AddAttachmentsPayload;
  removeListingAttachment: ?RemoveAttachmentPayload;
  archiveListing: ?ArchiveListingPayload;
  unarchiveListing: ?UnarchiveListingPayload;
  addIntegrationRefToListing: ?AddIntegrationRefToListingPayload;
  editIntegrationRefForListing: ?EditIntegrationRefForListingPayload;
  deleteIntegrationRefForListing: ?DeleteIntegrationRefForListingPayload;
  editDomainCheckinEnabledForListing: ?EditDomainCheckinEnabledForListingPayload;
  followListing: ?FollowListingPayload;
  unfollowListing: ?UnfollowListingPayload;
  grantAccessForListing: ?GrantAccessForListingPayload;
  revokeAccessForListing: ?RevokeAccessForListingPayload;
  setListingLiveViewShowNoteActivities: ?SetListingLiveViewShowNoteActivitiesPayload;
  setListingLiveViewShowDocsSentActivities: ?SetListingLiveViewShowDocsSentActivitiesPayload;
  setListingCalendarEventSettings: ?SetListingCalendarEventSettingsPayload;
  sendPostInspectionEmailForListing: ?SendPostInspectionEmailForListingPayload;
  updateListingContact: ?UpdateListingContactPayload;
  createHomeConnectionOpportunity: ?CreateHomeConnectionOpportunityPayload;
  createRentalApplicationOpportunity: ?CreateRentalApplicationOpportunityPayload;
  updatePayoutAccount: ?UpdatePayoutAccountPayload;
  approveRentalApplication: ?ApproveRentalApplicationPayload;
  rejectRentalApplication: ?RejectRentalApplicationPayload;
  setArchivedHomeConnectionOpportunity: ?SetArchivedHomeConnectionOpportunityPayload;
  addVendor: ?AddVendorPayload;
  removeVendor: ?RemoveVendorPayload;
  sendLoanReferral: ?SendLoanReferralPayload;
  addNote: ?AddNotePayload;
  updateNote: ?updateNotePayload;
  deleteNote: ?DeleteNotePayload;
  addIntegrationAccount: ?AddIntegrationAccountPayload;
  disableIntegrationAccount: ?DisableIntegrationAccountPayload;
  enableIntegrationAccount: ?EnableIntegrationAccountPayload;
  removeIntegrationAccount: ?RemoveIntegrationAccountPayload;
  /** Mutation to explicitly add a user to a space */
  addSpaceMember: ?AddSpaceMemberPayload;
  /** Mutation to explicitly remove a space member */
  removeSpaceMember: ?RemoveSpaceMemberPayload;
  /** Mutation to update the visibility of a space */
  setSpaceVisibility: ?SetSpaceVisibilityPayload;
  /** Mutation to approve a member request */
  approveSpaceMemberRequest: ?ApproveSpaceMemberRequestPayload;
  /** Mutation to reject a member request */
  rejectSpaceMemberRequest: ?RejectSpaceMemberRequestPayload;
  /** Mutation to get a space invite */
  getSpaceInvite: ?GetSpaceInvitePayload;
  /** Mutation to accept a space join space token */
  joinSpaceViaToken: ?JoinSpaceViaTokenPayload;
  /** Mutation to join a space. Will throw a bad request if the user is unable to join. Use this to join a OPEN or PRIVATE space. */
  joinSpace: ?JoinSpacePayload;
  /** Mutation to leave a space. Use this to cancel the viewer's space member request or to leave the space. */
  leaveSpace: ?LeaveSpacePayload;
}

declare type UpdateViewerInput = {
  firstName: ?string;
  lastName: ?string;
  imageUrl: ?string;
  timezone: ?string;
  preferences: ?UserPreferencesInput;
  countryCode: ?string;
  clientMutationId: ?string;
}

declare type UserPreferencesInput = {
  defaultAccountId: ?string;
  virtualAssistant: ?VirtualAssistantPreferenceInput;
  notifications: ?NotificationPreferenceInput;
}

declare type VirtualAssistantPreferenceInput = {
  enabled: ?boolean;
  dailySummary: ?boolean;
  weeklySummary: ?boolean;
  OFIsReminders: ?boolean;
  inspectionWrapUp: ?boolean;
}

declare type NotificationPreferenceInput = {
  push: ?NotificationPushPreferenceInput;
  email: ?NotificationEmailPreferenceInput;
}

declare type NotificationPushPreferenceInput = {
  enabled: ?boolean;
  messages: ?boolean;
  checkins: ?boolean;
  ofis: ?boolean;
}

declare type NotificationEmailPreferenceInput = {
  enabled: ?boolean;
  unreadMessages: ?boolean;
  weeklySummary: ?boolean;
  announcements: ?boolean;
}

declare type UpdateViewerPayload = {
  viewer: ?Viewer;
  clientMutationId: ?string;
}

declare type AutoJoinExistingAccountsInput = {
  clientMutationId: ?string;
}

declare type AutoJoinExistingAccountsPayload = {
  viewer: ?Viewer;
  clientMutationId: ?string;
}

declare type UpdateContactInput = {
  contactId: string;
  accountId: string;
  fullName: ?string;
  mobile: ?any;
  landline: ?any;
  email: ?any;
  address: ?Array<AddressComponentInputAgent>;
  contact: ?ContactInputType;
  clientMutationId: ?string;
}

declare type AddressComponentInputAgent = {
  longName: ?string;
  shortName: ?string;
  types: ?Array<string>;
  _editIndex: ?number;
  _operation: ?string;
}

declare type ContactInputType = {
  firstName: ?string;
  lastName: ?string;
  fullName: ?string;
  contactId: ?string;
  email: ?any;
  mobile: ?any;
  landline: ?any;
  suburb: ?string;
  instrument: ?string;
  address: ?string;
  addressComponents: ?Array<AddressComponentInputAgent>;
  addressPlaceId: ?string;
  ref: ?string;
  editedDate: ?string;
  addresses: ?Array<vCardAddressInput>;
  emails: ?Array<vCardEmailInput>;
  telephones: ?Array<vCardTelephoneInput>;
  relatedPeople: ?Array<vCardRelatedPersonInput>;
  referenceId: ?RefInput;
}

declare type vCardAddressInput = {
  label: string;
  addressType: vCardAddressType;
  otherAddressType: ?string;
  addressComponents: ?Array<AddressComponentInputAgent>;
}

declare type vCardEmailInput = {
  emailType: vCardEmailType;
  otherEmailType: ?string;
  email: any;
}

declare type vCardTelephoneInput = {
  telephoneType: vCardTelephoneType;
  telephoneLabel: ?string;
  number: any;
}

declare type vCardRelatedPersonInput = {
  firstName: string;
  lastName: ?string;
  relationType: vCardRelatedPersonType;
  otherRelatedPersonType: ?string;
  contactId: ?string;
}

declare type RefInput = {
  refId: string;
  refSource: string;
}

declare type UpdateContactPayload = {
  contact: ?Contact;
  clientMutationId: ?string;
}

declare type AddContactInput = {
  attachToId: string;
  attachToType: attachedToType;
  contact: ?ContactInputType;
  clientMutationId: ?string;
}

declare type attachedToType = "LISTING" | "ACCOUNT";

declare type AddContactPayload = {
  contactEdge: ?ContactEdge;
  contact: ?Contact;
  clientMutationId: ?string;
}

declare type AddAccountContactInput = {
  /** The accountId that the contact should be added to. */
  accountId: string;
  /** Required for offline. */
  action: ?ActionInputType;
  /** Optional. The device adding the contact. If no device (eg web) do not populate. */
  deviceReference: ?DeviceReferenceInputType;
  /** The contact to add. */
  contact: ContactInputType;
  /** Denotes the entity to link the contact to. Required if checkinActivity is populated. */
  linkTo: ?ContactLinkToInputType;
  /** Denotes the various notifications that should be sent */
  notifications: ?Array<ContactNotificationInputType>;
  /** Complete this if the user has indicated that the contact is to be checked in. */
  checkinContactActivity: ?CheckinContactActivityInputType;
  /** Include the note that should be added when the contact is added */
  contactNote: ?ContactNoteInput;
  clientMutationId: ?string;
}

/**
  Common input fields required to handle offline concerns (date of action, ID of action for idempotence)
*/
declare type ActionInputType = {
  /** A unique GUID assigned to the action to ensure idempotence. Important for offline. */
  correlationId: string;
  /** The date of the action. Required for offline. */
  actionDate: string;
}

declare type DeviceReferenceInputType = {
  deviceId: string;
  isKiosk: boolean;
}

declare type ContactLinkToInputType = {
  listingId: string;
}

declare type ContactNotificationInputType = {
  notificationType: ContactNotificationEnumType;
}

/**
  Indicates the various notifications that could be used to send communique to the contact.
*/
declare type ContactNotificationEnumType = "sendWelcomeSms";

/**
  Indicates that the contact being added visited the space.
*/
declare type CheckinContactActivityInputType = {
  /** Where did the checkin occur. */
  location: LocationInput;
  /** When did the checkin occur. Will default to the actionDate of nothing provided. */
  checkinDate: ?string;
}

declare type LocationInput = {
  lat: ?number;
  lng: ?number;
}

declare type ContactNoteInput = {
  text: string;
  shared: boolean;
  contactId: ?string;
}

declare type AddAccountContactPayload = {
  contactEdge: ?ContactEdge;
  contact: ?Contact;
  clientMutationId: ?string;
}

declare type AddEmailToUserForAuth0JwtInput = {
  secondaryJWT: string;
  clientMutationId: ?string;
}

declare type AddEmailToUserForAuth0JwtPayload = {
  viewer: ?Viewer;
  clientMutationId: ?string;
}

declare type AddMobileToUserForAuth0JwtInput = {
  secondaryJWT: string;
  clientMutationId: ?string;
}

declare type AddMobileToUserForAuth0JwtPayload = {
  viewer: ?Viewer;
  clientMutationId: ?string;
}

declare type unsubscribeBroadcastInput = {
  contactId: string;
  unsubscribeBroadcast: boolean;
  clientMutationId: ?string;
}

declare type unsubscribeBroadcastPayload = {
  contact: ?Contact;
  clientMutationId: ?string;
}

declare type CreateAccountInput = {
  accountInfo: ?AccountInfoInput;
  clientMutationId: ?string;
}

declare type AccountInfoInput = {
  accountId: string;
  accountName: string;
  officeIds: ?Array<string>;
  status: string;
}

declare type CreateAccountPayload = {
  invite: ?AccountInviteResult;
  accountEdge: ?AccountEdge;
  viewer: ?Viewer;
  clientMutationId: ?string;
}

/**
  A notification that invite has been created for this account
*/
declare type AccountInviteResult = {
  /** Lists of users that have been sent this invite */
  recipients: ?Array<InviteRecipient>;
  accountName: ?string;
}

/**
  Describes the person that will receive an invite
*/
declare type InviteRecipient = {
  firstName: ?string;
  email: ?string;
}

declare type UpdateAccountInput = {
  accountId: string;
  name: ?string;
  phone: ?string;
  imageUrl: ?string;
  streetNumber: ?string;
  streetName: ?string;
  locality: ?string;
  state: ?string;
  postcode: ?string;
  countryName: ?string;
  isoCountryCodeAlpha2: ?string;
  timezone: ?string;
  latitude: ?number;
  longitude: ?number;
  enableWelcomeSms: ?boolean;
  smsFrom: ?string;
  primaryColor: ?string;
  accentColor: ?string;
  allowAutoJoin: ?boolean;
  privateListings: ?boolean;
  clientMutationId: ?string;
}

declare type UpdateAccountPayload = {
  account: ?Account;
  clientMutationId: ?string;
}

declare type UpdateAccountMembershipInput = {
  accountMembershipId: ?string;
  role: ?Role;
  clientMutationId: ?string;
}

declare type Role = "admin" | "user";

declare type UpdateAccountMembershipPayload = {
  membership: ?AccountMembership;
  clientMutationId: ?string;
}

declare type RemoveAccountMembershipInput = {
  accountMembershipId: ?string;
  clientMutationId: ?string;
}

declare type RemoveAccountMembershipPayload = {
  /** The ID of an object */
  deletedMembershipNodeId: string;
  account: ?Account;
  viewer: ?Viewer;
  clientMutationId: ?string;
}

declare type CreateAccountMembershipInviteInput = {
  accountId: string;
  name: ?string;
  email: string;
  clientMutationId: ?string;
}

declare type CreateAccountMembershipInvitePayload = {
  accountMembershipInviteEdge: ?AccountMembershipInviteEdge;
  account: ?Account;
  clientMutationId: ?string;
}

declare type RemoveAccountMembershipInviteInput = {
  accountMembershipInviteId: string;
  clientMutationId: ?string;
}

declare type RemoveAccountMembershipInvitePayload = {
  /** The ID of an object */
  deletedAccountMembershipInviteNodeId: string;
  account: ?Account;
  clientMutationId: ?string;
}

declare type AcceptAccountMembershipInviteInput = {
  token: string;
  clientMutationId: ?string;
}

declare type AcceptAccountMembershipInvitePayload = {
  viewer: ?Viewer;
  account: ?Account;
  clientMutationId: ?string;
}

declare type RequestAccountCrmIntegrationInput = {
  accountId: string;
  accountCrmIntegrationId: string;
  clientMutationId: ?string;
}

declare type RequestAccountCrmIntegrationPayload = {
  crmIntegrationsEdge: ?AccountCrmIntegrationEdge;
  account: ?Account;
  clientMutationId: ?string;
}

declare type SetupBillingForAccountInput = {
  accountId: string;
  clientMutationId: ?string;
}

declare type SetupBillingForAccountPayload = {
  account: ?Account;
  clientMutationId: ?string;
}

declare type ActivatePlanForAccountInput = {
  accountId: string;
  planId: string;
  clientMutationId: ?string;
}

declare type ActivatePlanForAccountPayload = {
  account: ?Account;
  clientMutationId: ?string;
}

declare type UpdateBillingEmailForAccountInput = {
  accountId: string;
  email: any;
  clientMutationId: ?string;
}

declare type UpdateBillingEmailForAccountPayload = {
  account: ?Account;
  clientMutationId: ?string;
}

declare type AddAttendeeInput = {
  calendarEventId: string;
  name: string;
  email: any;
  mobile: ?any;
  clientMutationId: ?string;
}

declare type AddAttendeePayload = {
  calendarEvent: ?CalendarEvent;
  attendeeEdge: ?AttendeeEdge;
  attendee: ?Attendee;
  token: ?string;
  clientMutationId: ?string;
}

declare type SetAttendeeStatusInput = {
  attendeeId: string;
  status: attendeeStatus;
  clientMutationId: ?string;
}

declare type attendeeStatus = "ACCEPTED" | "DECLINED" | "DELETED";

declare type SetAttendeeStatusPayload = {
  calendarEvent: ?CalendarEvent;
  attendeeEdge: ?AttendeeEdge;
  attendee: ?Attendee;
  clientMutationId: ?string;
}

declare type LinkAttendeeToContactInput = {
  attendeeId: string;
  contactId: string;
  clientMutationId: ?string;
}

declare type LinkAttendeeToContactPayload = {
  calendarEvent: ?CalendarEvent;
  attendee: ?Attendee;
  contact: ?Contact;
  clientMutationId: ?string;
}

declare type LinkAttendeeToCheckinInput = {
  attendeeId: string;
  checkinId: string;
  clientMutationId: ?string;
}

declare type LinkAttendeeToCheckinPayload = {
  calendarEvent: ?CalendarEvent;
  attendee: ?Attendee;
  checkin: ?Checkin;
  clientMutationId: ?string;
}

declare type AddCalendarEventInput = {
  listingId: any;
  visibility: calendarEventVisibility;
  status: calendarEventStatusForAdd;
  startDate: string;
  endDate: ?string;
  clientMutationId: ?string;
}

declare type calendarEventVisibility = "PUBLIC" | "PRIVATE";

declare type calendarEventStatusForAdd = "TENTATIVE" | "CONFIRMED";

declare type AddCalendarEventPayload = {
  listing: ?Listing;
  calendarEventEdge: ?CalendarEventEdge;
  calendarEvent: ?CalendarEvent;
  clientMutationId: ?string;
}

declare type RequestCalendarEventInput = {
  listingId: any;
  startDate: string;
  attendee: ?AttendeeInputType;
  clientMutationId: ?string;
}

declare type AttendeeInputType = {
  name: string;
  email: any;
  mobile: ?any;
}

declare type RequestCalendarEventPayload = {
  listing: ?Listing;
  calendarEventEdge: ?CalendarEventEdge;
  calendarEvent: ?CalendarEvent;
  attendeeEdge: ?AttendeeEdge;
  attendee: ?Attendee;
  token: ?string;
  clientMutationId: ?string;
}

declare type UpdateCalendarEventInput = {
  calendarEventId: any;
  status: ?calendarEventStatus;
  visibility: ?calendarEventVisibility;
  clientMutationId: ?string;
}

declare type calendarEventStatus = "TENTATIVE" | "CONFIRMED" | "CANCELLED" | "DELETED";

declare type UpdateCalendarEventPayload = {
  calendarEvent: ?CalendarEvent;
  clientMutationId: ?string;
}

declare type AddCheckinInput = {
  ref: string;
  checkinDate: string;
  notify: boolean;
  instrument: string;
  applicationId: string;
  listingId: string;
  contactId: ?string;
  fullName: ?string;
  mobile: ?any;
  landline: ?string;
  email: ?string;
  countryCode: ?string;
  suburb: ?string;
  address: ?string;
  modifiedContactFields: ?Array<string>;
  passRef: ?string;
  customerRefId: ?string;
  contactNote: ?string;
  contactNoteShared: ?boolean;
  inspectionNote: ?string;
  inspectionNoteShared: ?boolean;
  addressPlaceId: ?string;
  attendeeId: ?string;
  clientMutationId: ?string;
}

declare type AddCheckinPayload = {
  checkin: ?Checkin;
  listingContact: ?ListingContact;
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type RemoveCheckinInput = {
  checkinId: ?string;
  ref: ?string;
  refSource: ?string;
  clientMutationId: ?string;
}

declare type RemoveCheckinPayload = {
  checkin: ?Checkin;
  listing: ?Listing;
  listingContact: ?ListingContact;
  clientMutationId: ?string;
}

declare type AddAttachmentsInput = {
  listingId: string;
  links: ?Array<FilePickerLinkInput>;
  clientMutationId: ?string;
}

declare type FilePickerLinkInput = {
  url: ?string;
  filename: ?string;
  mimetype: ?string;
  size: ?number;
  id: ?number;
  key: ?string;
  container: ?string;
  client: ?string;
  isWriteable: ?boolean;
}

declare type AddAttachmentsPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type RemoveAttachmentInput = {
  listingId: string;
  attachmentId: string;
  clientMutationId: ?string;
}

declare type RemoveAttachmentPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type ArchiveListingInput = {
  listingId: string;
  clientMutationId: ?string;
}

declare type ArchiveListingPayload = {
  listing: ?Listing;
  account: ?Account;
  clientMutationId: ?string;
}

declare type UnarchiveListingInput = {
  listingId: string;
  clientMutationId: ?string;
}

declare type UnarchiveListingPayload = {
  listing: ?Listing;
  account: ?Account;
  clientMutationId: ?string;
}

declare type AddIntegrationRefToListingInput = {
  listingId: string;
  ref: string;
  refSource: string;
  clientMutationId: ?string;
}

declare type AddIntegrationRefToListingPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type EditIntegrationRefForListingInput = {
  listingId: string;
  integrationRefId: string;
  ref: string;
  clientMutationId: ?string;
}

declare type EditIntegrationRefForListingPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type DeleteIntegrationRefForListingInput = {
  listingId: string;
  integrationRefId: string;
  clientMutationId: ?string;
}

declare type DeleteIntegrationRefForListingPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type EditDomainCheckinEnabledForListingInput = {
  listingId: string;
  domainCheckinEnabled: boolean;
  clientMutationId: ?string;
}

declare type EditDomainCheckinEnabledForListingPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type FollowListingInput = {
  listingId: string;
  includeArchived: ?boolean;
  clientMutationId: ?string;
}

declare type FollowListingPayload = {
  listing: ?Listing;
  account: ?Account;
  followedListingsEdge: ?ListingEdge;
  clientMutationId: ?string;
}

declare type UnfollowListingInput = {
  listingId: string;
  clientMutationId: ?string;
}

declare type UnfollowListingPayload = {
  listing: ?Listing;
  account: ?Account;
  /** The ID of an object */
  unfollowedListingNodeId: string;
  clientMutationId: ?string;
}

declare type GrantAccessForListingInput = {
  userId: string;
  listingId: string;
  clientMutationId: ?string;
}

declare type GrantAccessForListingPayload = {
  listing: ?Listing;
  userEdge: ?UserEdge;
  clientMutationId: ?string;
}

declare type RevokeAccessForListingInput = {
  userId: string;
  listingId: string;
  clientMutationId: ?string;
}

declare type RevokeAccessForListingPayload = {
  listing: ?Listing;
  /** The ID of an object */
  revokedUserNodeId: string;
  clientMutationId: ?string;
}

declare type SetListingLiveViewShowNoteActivitiesInput = {
  listingId: string;
  enabled: ?boolean;
  clientMutationId: ?string;
}

declare type SetListingLiveViewShowNoteActivitiesPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type SetListingLiveViewShowDocsSentActivitiesInput = {
  listingId: string;
  enabled: ?boolean;
  clientMutationId: ?string;
}

declare type SetListingLiveViewShowDocsSentActivitiesPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type SetListingCalendarEventSettingsInput = {
  listingId: any;
  duration: ?DurationInput;
  allowedCalendarEventRequest: ?allowedCalendarEventRequestType;
  clientMutationId: ?string;
}

declare type DurationInput = {
  amount: ?number;
  unit: ?durationUnit;
}

declare type SetListingCalendarEventSettingsPayload = {
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type SendPostInspectionEmailForListingInput = {
  listingId: any;
  email: ?string;
  clientMutationId: ?string;
}

declare type SendPostInspectionEmailForListingPayload = {
  listing: ?Listing;
  email: ?string;
  clientMutationId: ?string;
}

declare type UpdateListingContactInput = {
  id: string;
  flagged: ?boolean;
  clientMutationId: ?string;
}

declare type UpdateListingContactPayload = {
  listingContact: ?ListingContact;
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type CreateHomeConnectionOpportunityInput = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  address: ?Array<AddressComponentInputAgent>;
  accountId: string;
  clientMutationId: ?string;
}

declare type CreateHomeConnectionOpportunityPayload = {
  account: ?Account;
  opportunityEdge: ?OpportunityEdge;
  clientMutationId: ?string;
}

declare type CreateRentalApplicationOpportunityInput = {
  name: string;
  email: string;
  listingId: string;
  clientMutationId: ?string;
}

declare type CreateRentalApplicationOpportunityPayload = {
  listing: ?Listing;
  opportunityEdge: ?OpportunityEdge;
  clientMutationId: ?string;
}

declare type UpdatePayoutAccountInput = {
  accountId: string;
  payoutAccount: ?PaymentDetailsInput;
  clientMutationId: ?string;
}

declare type PaymentDetailsInput = {
  bsb: string;
  accountNumber: string;
  accountName: string;
}

declare type UpdatePayoutAccountPayload = {
  account: ?Account;
  clientMutationId: ?string;
}

declare type ApproveRentalApplicationInput = {
  opportunityId: string;
  notifyApplicants: ?boolean;
  inviteToConnect: ?boolean;
  clientMutationId: ?string;
}

declare type ApproveRentalApplicationPayload = {
  opportunity: ?RentalApplicationOpportunity;
  clientMutationId: ?string;
}

declare type RentalApplicationOpportunity = {
  /** The ID of an object */
  id: string;
  opportunityId: ?string;
  type: ?string;
  createdAt: ?string;
  createdBy: ?User;
  name: ?string;
  status: ?string;
  email: ?string;
  application: ?RentalApplicationAgent;
  activities: ?ActivityConnection;
}

/**
  Rental application information
*/
declare type RentalApplicationAgent = {
  /** The ID of an object */
  id: string;
  applicationId: ?string;
  listingId: ?string;
  status: ?string;
  consumerProfiles: ?Array<ConsumerProfileDetails>;
  applicationDetails: ?ApplicationDetails;
  otherOccupants: ?Array<OccupantPerson>;
  vehicles: ?Array<OccupantVehicle>;
  pets: ?Array<OccupantPet>;
  timezone: ?string;
}

/**
  Information about the user who completed the rental application
*/
declare type ConsumerProfileDetails = {
  consumerUserId: ?string;
  personalDetails: ?PersonalDetails;
  livingSituations: ?Array<LivingSituation>;
  employmentHistory: ?Array<JobType>;
  identification: ?Array<Identification>;
  references: ?Array<ConsumerReference>;
  timezone: ?string;
}

/**
  Personal details on the profile
*/
declare type PersonalDetails = {
  title: ?string;
  firstName: ?string;
  lastName: ?string;
  birthday: ?string;
  gender: ?string;
  email: ?string;
  countryCode: ?string;
  phone: ?string;
  smoker: ?boolean;
  emergencyContact: ?EmergencyContact;
}

/**
  Emergeny contact info
*/
declare type EmergencyContact = {
  fullName: ?string;
  address: ?string;
  relationship: ?string;
  countryCode: ?string;
  phone: ?string;
  _operation: ?string;
}

/**
  Living situation info
*/
declare type LivingSituation = {
  situation: ?string;
  moveInDate: ?string;
  reasonForLeaving: ?string;
  contactName: ?string;
  contactCountryCode: ?string;
  contactPhone: ?string;
  contactEmail: ?string;
  monthlyRent: ?string;
  _editIndex: ?number;
  _operation: ?string;
  formattedAddress: ?string;
  address: ?Array<AddressComponent>;
}

/**
  Employment info
*/
declare type JobType = {
  situation: ?string;
  companyName: ?string;
  contactName: ?string;
  contactEmail: ?string;
  contactCountryCode: ?string;
  contactPhone: ?string;
  industry: ?string;
  occupation: ?string;
  startDate: ?string;
  endDate: ?string;
  salary: ?string;
  abn: ?string;
  acn: ?string;
  accountantName: ?string;
  accountantCountryCode: ?string;
  accountantPhone: ?string;
  lawyerName: ?string;
  lawyerCountryCode: ?string;
  lawyerPhone: ?string;
  _editIndex: ?number;
  _operation: ?string;
  formattedCompanyAddress: ?string;
  companyAddress: ?Array<AddressComponent>;
}

/**
  Identification info
*/
declare type Identification = {
  _editIndex: ?number;
  _operation: ?string;
  idType: ?string;
  idDescription: ?string;
  idNumber: ?string;
  idExtra: ?string;
  idExpiration: ?string;
  idFile: ?File;
}

/**
  File metadata
*/
declare type File = {
  fileName: ?string;
  fileGUID: ?string;
  fileSize: ?number;
  mimeType: ?string;
}

/**
  Reference contact info
*/
declare type ConsumerReference = {
  fullName: ?string;
  relationship: ?string;
  countryCode: ?string;
  phone: ?string;
  email: ?string;
  _editIndex: ?number;
  _operation: ?string;
}

/**
  Rental application info
*/
declare type ApplicationDetails = {
  preferredCommencementDate: ?string;
  leaseLength: ?string;
  rent: ?string;
  rentPeriod: ?string;
}

/**
  Personal details of additional occupants
*/
declare type OccupantPerson = {
  firstName: ?string;
  lastName: ?string;
  onLease: ?boolean;
  relationship: ?string;
  age: ?number;
  email: ?string;
  countryCode: ?string;
  phone: ?string;
  _editIndex: ?number;
  _operation: ?string;
}

/**
  Vehicle details
*/
declare type OccupantVehicle = {
  makeAndModel: ?string;
  registrationNumber: ?string;
  _editIndex: ?number;
  _operation: ?string;
}

/**
  Pet details
*/
declare type OccupantPet = {
  petType: ?string;
  registrationNumber: ?string;
  _editIndex: ?number;
  _operation: ?string;
}

declare type RejectRentalApplicationInput = {
  opportunityId: string;
  notifyApplicants: ?boolean;
  clientMutationId: ?string;
}

declare type RejectRentalApplicationPayload = {
  opportunity: ?RentalApplicationOpportunity;
  clientMutationId: ?string;
}

declare type SetArchivedHomeConnectionOpportunityInput = {
  opportunityId: string;
  archived: boolean;
  clientMutationId: ?string;
}

declare type SetArchivedHomeConnectionOpportunityPayload = {
  opportunity: ?HomeConnectionOpportunity;
  clientMutationId: ?string;
}

declare type HomeConnectionOpportunity = {
  /** The ID of an object */
  id: string;
  opportunityId: ?string;
  type: ?string;
  createdAt: ?string;
  createdBy: ?User;
  name: ?string;
  email: ?string;
  archived: ?boolean;
  status: ?string;
  address: ?string;
  addressShort: ?string;
  sales: ?Array<HomeConnectionOpportunitySale>;
  activities: ?Array<HomeConnectionOpportunityActivity>;
}

declare type HomeConnectionOpportunitySale = {
  type: ?string;
  offer: ?string;
  retailer: ?string;
  verifiedDate: ?string;
  createdDate: ?string;
  icon: ?string;
  status: ?string;
}

declare type HomeConnectionOpportunityActivity = {
  actor: ?string;
  verb: ?string;
  object: ?string;
  time: ?string;
}

declare type AddVendorInput = {
  contact: ?ContactInputType;
  listingId: string;
  clientMutationId: ?string;
}

declare type AddVendorPayload = {
  vendor: ?Vendor;
  vendorEdge: ?VendorEdge;
  listing: ?Listing;
  clientMutationId: ?string;
}

declare type RemoveVendorInput = {
  vendorId: ?string;
  clientMutationId: ?string;
}

declare type RemoveVendorPayload = {
  listing: ?Listing;
  /** The ID of an object */
  deletedVendorNodeId: string;
  clientMutationId: ?string;
}

declare type SendLoanReferralInput = {
  phoneNumber: ?string;
  name: ?string;
  listingId: ?string;
  clientMutationId: ?string;
}

declare type SendLoanReferralPayload = {
  success: ?boolean;
  clientMutationId: ?string;
}

declare type AddNoteInput = {
  text: string;
  contactId: string;
  attachedToId: ?string;
  attachedToType: ?AttachedToType;
  shared: boolean;
  isVendorComment: boolean;
  ref: ?string;
  refSource: ?string;
  clientMutationId: ?string;
}

declare type AttachedToType = "LISTING";

declare type AddNotePayload = {
  contact: ?Contact;
  note: ?Note;
  noteEdge: ?NoteEdge;
  clientMutationId: ?string;
}

declare type updateNoteInput = {
  noteId: string;
  text: ?string;
  shared: ?boolean;
  isVendorComment: ?boolean;
  clientMutationId: ?string;
}

declare type updateNotePayload = {
  note: ?Note;
  clientMutationId: ?string;
}

declare type DeleteNoteInput = {
  noteId: string;
  clientMutationId: ?string;
}

declare type DeleteNotePayload = {
  contact: ?Contact;
  deletedNoteId: ?string;
  clientMutationId: ?string;
}

declare type AddIntegrationAccountInput = {
  integrationRequest: IntegrationRequestInput;
  clientMutationId: ?string;
}

declare type IntegrationRequestInput = {
  applicationId: string;
  accountId: string;
  username: ?string;
  password: ?string;
}

declare type AddIntegrationAccountPayload = {
  integrationRequestResponse: IntegrationRequestResponse;
  clientMutationId: ?string;
}

declare type IntegrationRequestResponse = {
  /** Indicate the authentication strategy to use. */
  authStrategy: AuthStrategyEnum;
  /** In some cases, the request could generate the integration account record. */
  integrationAccount: ?IntegrationAccount;
  /** Indicate the Auth0 connection to use when performing OAuth2 authentication. */
  auth0Connection: ?string;
}

declare type DisableIntegrationAccountInput = {
  integrationAccountId: string;
  clientMutationId: ?string;
}

declare type DisableIntegrationAccountPayload = {
  integrationAccount: IntegrationAccount;
  clientMutationId: ?string;
}

declare type EnableIntegrationAccountInput = {
  integrationAccountId: string;
  clientMutationId: ?string;
}

declare type EnableIntegrationAccountPayload = {
  integrationAccount: IntegrationAccount;
  clientMutationId: ?string;
}

declare type RemoveIntegrationAccountInput = {
  integrationAccountId: string;
  clientMutationId: ?string;
}

declare type RemoveIntegrationAccountPayload = {
  integrationAccount: IntegrationAccount;
  clientMutationId: ?string;
}

declare type AddSpaceMemberInput = {
  /** The ID of the user to add member to */
  userId: string;
  /** The ID of the space to add member to */
  spaceId: string;
  /** The role to assign the user. Defaults to ADMIN */
  role: ?SpaceMemberRole;
  clientMutationId: ?string;
}

declare type AddSpaceMemberPayload = {
  spaceMember: ?SpaceMember;
  space: ?Space;
  clientMutationId: ?string;
}

declare type RemoveSpaceMemberInput = {
  /** The ID of the member to remove */
  spaceMemberId: string;
  clientMutationId: ?string;
}

declare type RemoveSpaceMemberPayload = {
  space: ?Space;
  spaceMember: ?SpaceMember;
  clientMutationId: ?string;
}

declare type SetSpaceVisibilityInput = {
  /** The ID of the space */
  spaceId: string;
  /** Sets the visibility of the space */
  visibility: SpaceVisibility;
  clientMutationId: ?string;
}

declare type SetSpaceVisibilityPayload = {
  space: ?Space;
  clientMutationId: ?string;
}

declare type ApproveSpaceMemberRequestInput = {
  /** The ID of the member request */
  spaceMemberRequestId: string;
  clientMutationId: ?string;
}

declare type ApproveSpaceMemberRequestPayload = {
  space: ?Space;
  spaceMember: ?SpaceMember;
  clientMutationId: ?string;
}

declare type RejectSpaceMemberRequestInput = {
  /** The ID of the member request */
  spaceMemberRequestId: string;
  clientMutationId: ?string;
}

declare type RejectSpaceMemberRequestPayload = {
  space: ?Space;
  clientMutationId: ?string;
}

declare type GetSpaceInviteInput = {
  /** The ID of the space */
  spaceId: string;
  /** The role to apply to the member that is created upon accepting the invite. Will default to GUEST if not provided. */
  role: ?SpaceMemberRole;
  clientMutationId: ?string;
}

declare type GetSpaceInvitePayload = {
  spaceInvite: ?SpaceInvitationType;
  clientMutationId: ?string;
}

declare type SpaceInvitationType = {
  subject: ?string;
  body: ?string;
  inviteUrl: ?string;
}

declare type JoinSpaceViaTokenInput = {
  /** The invite JWT token that was sent to the user */
  token: string;
  clientMutationId: ?string;
}

declare type JoinSpaceViaTokenPayload = {
  space: ?Space;
  spaceMember: ?SpaceMember;
  clientMutationId: ?string;
}

declare type JoinSpaceInput = {
  /** The ID of the space */
  spaceId: string;
  /** The role to assign the user. Defaults to ADMIN */
  role: ?SpaceMemberRole;
  clientMutationId: ?string;
}

declare type JoinSpacePayload = {
  space: ?Space;
  spaceMember: ?SpaceMember;
  spaceMemberRequest: ?SpaceMemberRequest;
  clientMutationId: ?string;
}

declare type LeaveSpaceInput = {
  /** The ID of the space */
  spaceId: string;
  clientMutationId: ?string;
}

declare type LeaveSpacePayload = {
  space: ?Space;
  clientMutationId: ?string;
}

/**
  Information about a utility
*/
declare type HomeConnectionProduct = {
  /** The ID of an object */
  id: string;
  brandLogo: ?string;
  retailerId: ?string;
  brand: ?string;
  productId: ?string;
  brandTitle: ?string;
  isConnection: ?string;
  shortDetails: ?string;
  contractDetails: ?string;
  contractText: ?string;
  cancellationFees: ?string;
  planDetails: ?string;
  planInfo: ?string;
  billingOptions: ?string;
  totalDiscountElectricity: ?string;
  totalDiscountGas: ?string;
  payOntimeDiscounts: ?string;
  emailBillingDiscounts: ?string;
  guarenteedDiscounts: ?string;
  otherDiscounts: ?string;
  retailerTermsConditions: ?string;
  retailerPrivacyPolicy: ?string;
  feeDetails: ?string;
  cost: ?string;
}