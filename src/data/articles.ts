import { ArticleData } from '../types/news';

export const ARTICLES: Record<string, ArticleData> = {
  'amphibious-metropolis': {
    id: 'amphibious-metropolis',
    section: 'Cities',
    kicker: 'Cities & Infrastructure · Special Report',
    title: 'Holding Back the Tide Without Concrete Walls',
    deck: 'Across Rotterdam, Copenhagen, and Tokyo, municipal engineers are dismantling single-purpose flood barriers in favor of stepped riverfront parks, sunken basketball courts, and subterranean storm cathedrals.',
    publishedAt: 'November 20, 2026',
    readTimeMinutes: 8,
    author: {
      name: 'Elena Vance',
      initials: 'EV',
      role: 'Senior Infrastructure Correspondent',
      desk: 'Rotterdam & Tokyo',
      bio: 'Elena Vance covers maritime engineering, urban hydrology, and municipal climate finance across Northern Europe and East Asia.',
    },
    hero: {
      src: '/src/assets/images/hero_tidal_park_1795199041691.jpg',
      alt: 'Terraced granite and limestone tidal steps descending into the harbor at Maashaven Tidal Park in Rotterdam at golden hour',
      caption:
        'Fig. 1 — Terraced granite floodsteps along the Maashaven basin in Rotterdam allow brackish harbor water to rise and recede daily beneath public promenades.',
      credit: 'Henrik Lindqvist for The Meridian',
    },
    leadParagraph:
      'For nearly seventy years after the devastating North Sea flood of 1953, coastal engineering followed an unambiguous doctrine: pour higher concrete, build heavier gates, and keep every drop of estuarine water out of sight. Yet along the southern bank of Rotterdam’s Nieuwe Maas river this autumn, residents descend broad granite staircases directly toward the waterline, strolling past salt-marsh reeds that deliberately flood twice a day.',
    sections: [
      {
        id: 'section-concrete-paradox',
        numeral: '01',
        heading: 'The Concrete Paradox',
        paragraphs: [
          'Traditional sheet-pile seawalls solve one hydraulic problem while quietly compounding two urban ones. By sealing riverbanks behind vertical bulkheads, port cities sever ecological intertidal zones and turn waterfront neighborhoods into wind-scoured transit corridors. Worse still, rigid walls offer zero tolerance once storm surge heights exceed their design crest—when a levee overtops, failure is catastrophic rather than gradual.',
          'Municipal hydrologists now refer to the alternative as “elastic frontage.” Instead of concentrating defense along a single brittle line, planners widen the boundary between street level and river level into a series of sacrificial terraces. On 350 sunny or overcast days a year, those tiers serve as amphitheaters, bikeways, and tidal gardens. During a severe North Sea gale, the lower promenades calmly submerge, absorbing wave energy before it ever reaches residential foundations.',
        ],
        pullQuote: {
          quote:
            'A concrete seawall spends ninety-nine percent of its working life doing nothing for the neighborhood. A tidal park pays civic rent every single morning.',
          attribution: 'Dr. Pieter Vermeulen, Chief Hydrologist, Delta Urbanism Lab',
        },
        embedGalleryAfter: true,
      },
      {
        id: 'section-sponge-economics',
        numeral: '02',
        heading: 'Cloudbursts and Dual-Use Plazas',
        paragraphs: [
          'The shift is equally visible inland, where extreme cloudbursts—storms dumping more than 80 millimeters of rain in a single hour—regularly overwhelm nineteenth-century combined sewers. In Copenhagen’s Vesterbro district, city engineers carved out Enghaveparken as a sunken retention basin disguised as a neighborhood plaza and athletic court.',
          'When summer downpours strike, perimeter gates seal automatically and the stepped concrete bowl fills with up to 22,600 cubic meters of runoff, shielding surrounding basements and metro tunnels. Once storms pass, filtered water feeds street trees and municipal cleaning trucks before the sunken court dries back out for evening five-a-side matches.',
        ],
        embedPrimaryPollAfter: true,
      },
      {
        id: 'section-underground-cathedrals',
        numeral: '03',
        heading: 'Subterranean Cathedrals and Salt Marshes',
        paragraphs: [
          'Where dense real estate prohibits surface basins, cities are digging deep beneath commuter rail lines and soccer fields. Outside Tokyo, the Metropolitan Area Outer Underground Discharge Channel links five concrete silos to a 177-meter pressure-control cavern supported by fifty-nine monumental pillars. Capable of pumping 200 metric tons of floodwater per second into the Edo River, the chamber remains dry most of the year—quietly hosting architectural tours when typhoon alerts subside.',
          'Yet engineering giants alone cannot carry the century. In Boston and Antwerp, municipal bonds increasingly fund restored salt marshes and elevated cedar boardwalks alongside steel barriers. Coastal cordgrass meadows dampen incoming wave heights by up to 40 percent over just thirty meters of width, proving that soft sediment and public timber walkways often outperform riprap boulders over a fifty-year maintenance cycle.',
        ],
        embedTableAfter: true,
      },
      {
        id: 'section-municipal-reckoning',
        numeral: '04',
        heading: 'Who Pays for the Amphibious City?',
        paragraphs: [
          'Converting rigid infrastructure into civic landscape demands more than clever drafting; it forces municipal treasuries to reconcile budgets that historically belonged to separate silos. Parks departments rarely possess capital reserves for storm-surge gates, while water utilities are seldom mandated to curate seating terraces or native reed beds.',
          'Rotterdam’s solution—pooling port authority lease revenues with national delta-protection grants—has lowered combined capital expenditure by roughly 18 percent compared with standalone grey-concrete reinforcement. As bond markets begin pricing climate resilience into municipal credit ratings, dual-use design is rapidly graduating from architectural experiment to fiscal orthodoxy.',
        ],
        embedSecondaryPollAfter: true,
      },
    ],
    gallery: [
      {
        id: 'plate-01',
        plateNumber: '01',
        src: '/src/assets/images/gallery_storm_gate_1795199042449.jpg',
        alt: 'White steel and concrete storm surge barrier spanning a North Sea tidal estuary under heavy overcast clouds',
        title: 'Eastern Scheldt Hydraulic Surge Gates',
        location: 'Zeeland, Netherlands · 51.604° N',
        photographer: 'Henrik Lindqvist',
        caption:
          'Movable steel sluice gates stand open under calm conditions to preserve estuarine salinity, closing only when North Sea storm surges exceed +3.0 meters NAP.',
        aspect: '16:9',
      },
      {
        id: 'plate-02',
        plateNumber: '02',
        src: '/src/assets/images/gallery_sponge_plaza_1795199042016.jpg',
        alt: 'Sunken pale concrete amphitheater plaza with pedestrians sitting on stepped tiers during sunny afternoon',
        title: 'Sunken Cloudburst Amphitheater',
        location: 'Copenhagen, Denmark · 55.664° N',
        photographer: 'Freja Nørgaard',
        caption:
          'Stepped limestone-aggregate benches surround a recessed civic court engineered to store 22,600 cubic meters of flash-flood runoff during summer cloudbursts.',
        aspect: '16:9',
      },
      {
        id: 'plate-03',
        plateNumber: '03',
        src: '/src/assets/images/gallery_marsh_boardwalk_1795199041807.jpg',
        alt: 'Weathered timber boardwalk winding across restored salt marsh wetlands toward modern glass waterfront buildings in morning fog',
        title: 'Restored Tidal Marsh & Cedar Spine',
        location: 'Nieuwe Maas Estuary · 51.908° N',
        photographer: 'Henrik Lindqvist',
        caption:
          'An elevated timber walkway threads through planted Phragmites beds that slow wake erosion and filter urban stormwater before harbor discharge.',
        aspect: '16:9',
      },
      {
        id: 'plate-04',
        plateNumber: '04',
        src: '/src/assets/images/gallery_tokyo_reservoir_1795199041482.jpg',
        alt: 'Monumental subterranean concrete floodwater discharge cavern in Saitama with towering pillars and subtle floor water reflections',
        title: 'G-Cans Subterranean Pressure Hall',
        location: 'Kasukabe, Greater Tokyo · 35.997° N',
        photographer: 'Kenji Takahashi',
        caption:
          'Fifty-nine reinforced concrete columns—each weighing 500 metric tons—stabilize Tokyo’s underground surge vault against groundwater uplift between typhoons.',
        aspect: '16:9',
      },
    ],
    primaryPoll: {
      id: 'poll-financing',
      kicker: 'Reader Policy Poll · Infrastructure Finance',
      question: 'How should coastal municipalities finance multi-decade tidal park conversions?',
      contextNote:
        'Select one funding mechanism. Results update live across active readers.',
      closesLabel: 'Poll closes Nov 27, 2026',
      hasSegmentFilter: false,
      options: [
        {
          id: 'opt-green-bonds',
          label: 'Dedicated municipal green bonds backed by flood-insurance savings',
          votes: 842,
          plannerVotes: 410,
          residentVotes: 432,
        },
        {
          id: 'opt-developer-levy',
          label: 'Waterfront real-estate resilience levies on new commercial towers',
          votes: 619,
          plannerVotes: 245,
          residentVotes: 374,
        },
        {
          id: 'opt-national-grant',
          label: 'National treasury matching grants tied to dual-use public access',
          votes: 504,
          plannerVotes: 290,
          residentVotes: 214,
        },
        {
          id: 'opt-utility-fee',
          label: 'Graduated stormwater utility fees based on impermeable lot area',
          votes: 287,
          plannerVotes: 162,
          residentVotes: 125,
        },
      ],
    },
    secondaryPoll: {
      id: 'poll-verdict',
      kicker: 'Edition Reader Verdict · Urban Priorities',
      question: 'Which urban resilience model feels most viable for your own city over the next decade?',
      contextNote:
        'Filter responses by reader cohort after voting to compare municipal planners with coastal residents.',
      closesLabel: '1,842 verified responses',
      hasSegmentFilter: true,
      options: [
        {
          id: 'verdict-sponge',
          label: 'Sunken neighborhood sponge parks and permeable street plazas',
          votes: 764,
          plannerVotes: 318,
          residentVotes: 446,
        },
        {
          id: 'verdict-marsh',
          label: 'Soft shoreline restoration with tidal marshes and stepped boardwalks',
          votes: 582,
          plannerVotes: 229,
          residentVotes: 353,
        },
        {
          id: 'verdict-vault',
          label: 'Deep underground stormwater tunnels and automated surge barriers',
          votes: 331,
          plannerVotes: 194,
          residentVotes: 137,
        },
        {
          id: 'verdict-retreat',
          label: 'Managed retreat and buyouts in chronically inundated districts',
          votes: 165,
          plannerVotes: 92,
          residentVotes: 73,
        },
      ],
    },
    comparisonProjects: [
      {
        id: 'proj-rotterdam',
        project: 'Maashaven Tidal Park',
        city: 'Rotterdam',
        retentionM3: 48500,
        civicDaysPerYear: 352,
        costMillionsUsd: 142,
        yearCompleted: 2025,
      },
      {
        id: 'proj-copenhagen',
        project: 'Enghaveparken Cloudburst',
        city: 'Copenhagen',
        retentionM3: 22600,
        civicDaysPerYear: 358,
        costMillionsUsd: 38,
        yearCompleted: 2021,
      },
      {
        id: 'proj-tokyo',
        project: 'G-Cans Surge Vault',
        city: 'Saitama / Tokyo',
        retentionM3: 670000,
        civicDaysPerYear: 210,
        costMillionsUsd: 2400,
        yearCompleted: 2006,
      },
      {
        id: 'proj-singapore',
        project: 'Bishan-Ang Mo Kio Basin',
        city: 'Singapore',
        retentionM3: 94000,
        civicDaysPerYear: 360,
        costMillionsUsd: 78,
        yearCompleted: 2012,
      },
    ],
    marginNotes: [
      {
        id: 'mn-1',
        index: 'Note 01',
        term: 'NAP Datum (Normaal Amsterdams Peil)',
        definition:
          'The European vertical reference datum representing mean sea level at Amsterdam; Rotterdam surge barriers calibrate crest tolerances in centimeters above NAP.',
        sourceRef: 'Rijkswaterstaat Hydrographic Manual, 2025',
      },
      {
        id: 'mn-2',
        index: 'Note 02',
        term: '100-Year Cloudburst Threshold',
        definition:
          'A storm intensity carrying a 1% annual exceedance probability—historically >75 mm/hr in Northern Europe, now recalibrated upward by 24% for 2050 planning.',
        sourceRef: 'Danish Meteorological Institute Urban Atlas',
      },
      {
        id: 'mn-3',
        index: 'Note 03',
        term: 'Wave Attenuation Coefficient',
        definition:
          'Mature salt-marsh cordgrass stands reduce orbital wave velocity through stem drag, cutting overtopping force by up to 40% across a 30-meter buffer.',
        sourceRef: 'Delft Hydraulics Coastal Mechanics Review',
      },
    ],
    keyMetrics: [
      { label: 'Wave Force Reduction', value: '40%', unit: 'per 30m marsh' },
      { label: 'Combined Capex Savings', value: '18%', unit: 'vs. concrete wall' },
      { label: 'Active Civic Days', value: '352', unit: 'days / year' },
      { label: 'Subterranean Pump Rate', value: '200', unit: 't / sec (Tokyo)' },
    ],
    footnotes: [
      {
        id: 1,
        citation: 'Rotterdam Port Authority & Municipality Joint Waterfront Budget Audit (FY 2024–2026).',
        source: 'Municipality of Rotterdam Spatial Planning Archive',
      },
      {
        id: 2,
        citation: 'Copenhagen Cloudburst Management Plan: Hydraulic Performance Post-Occupancy Evaluation.',
        source: 'HOFOR Utility Technical Papers, Vol. 14',
      },
      {
        id: 3,
        citation: 'Edogawa River Office Subterranean Discharge Operations Log (2006–2025).',
        source: 'Ministry of Land, Infrastructure, Transport and Tourism, Japan',
      },
    ],
    initialComments: [
      {
        id: 'c-1',
        author: 'Marcus Lindholm',
        role: 'Municipal Civil Engineer',
        location: 'Gothenburg',
        timestamp: '2 hours ago',
        createdAtMs: Date.now() - 2 * 3600 * 1000,
        body: 'The most overlooked hurdle in dual-use parks is not hydraulic modeling—it is post-storm silt cleanup. If a brackish river deposits 4 centimeters of fine harbor mud across granite amphitheater steps twice a year, parks budgets need dedicated high-pressure washdown crews written into the original bond.',
        upvotes: 48,
        replies: [
          {
            id: 'r-1',
            author: 'Elena Vance',
            role: 'Author · The Meridian',
            timestamp: '1 hour ago',
            body: 'Great point, Marcus. In Maashaven, Rotterdam actually sloped the intermediate granite terraces at a 2.5% cross-fall specifically so tidal ebb washes most fine sediment back out before maintenance crews arrive.',
          },
        ],
      },
      {
        id: 'c-2',
        author: 'Sora Takahashi',
        role: 'Urban Planner',
        location: 'Osaka',
        timestamp: '5 hours ago',
        createdAtMs: Date.now() - 5 * 3600 * 1000,
        body: 'Combining stormwater retention with neighborhood sports courts is brilliant for public buy-in. Nobody attends a public hearing excited about a concrete culvert, but residents passionately defend a community basketball plaza.',
        upvotes: 31,
      },
      {
        id: 'c-3',
        author: 'Claire Beaumont',
        role: 'Coastal Economist',
        location: 'Bordeaux',
        timestamp: '9 hours ago',
        createdAtMs: Date.now() - 9 * 3600 * 1000,
        body: 'Bond rating agencies are already rewarding cities that publish measurable flood-damage avoidance ratios. Expect stormwater utility fees tied to impermeable roof area to become standard across Western Europe by 2028.',
        upvotes: 19,
      },
    ],
    relatedIds: ['basalt-and-steam', 'timber-eight-stories', 'subterranean-cathedral', 'marshlands-seawalls'],
  },

  'basalt-and-steam': {
    id: 'basalt-and-steam',
    section: 'Climate',
    kicker: 'Climate & Energy · Nordic Dispatch',
    title: 'Basalt & Steam: How Iceland’s Deep Grids Stabilize European Wind',
    deck: 'New high-voltage subsea interconnectors and supercritical geothermal boreholes are turning volcanic steam fields into a steady baseload battery for northern industry.',
    publishedAt: 'November 18, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Mikkel Sørensen',
      initials: 'MS',
      role: 'Energy & Grid Editor',
      desk: 'Reykjavík & Oslo',
      bio: 'Mikkel Sørensen reports on European grid synchronization, subsea transmission, and geothermal metallurgy.',
    },
    hero: {
      src: '/src/assets/images/related_geothermal_station_1795199041835.jpg',
      alt: 'Brushed stainless steel geothermal pipelines winding across dark mossy volcanic basalt terrain in Iceland with white steam plumes',
      caption:
        'Fig. 1 — Insulated steam transmission manifolds cross mossy lava fields above Hellisheiði, feeding both district heating and mineral carbonation units.',
      credit: 'Sigrún Jónsdóttir for The Meridian',
    },
    leadParagraph:
      'Forty kilometers east of Reykjavík, insulated stainless-steel pipelines snake across black vesicular basalt like silvery tendons. Unlike wind turbines off Dogger Bank or solar arrays across Andalusia, the steam pulsing through these pipes never pauses for calm weather or winter twilight.',
    sections: [
      {
        id: 'section-supercritical',
        numeral: '01',
        heading: 'Drilling Beyond Boiling Point',
        paragraphs: [
          'Conventional geothermal wells tap water-steam mixtures roughly two kilometers underground at 250 degrees Celsius. Engineers testing next-generation supercritical boreholes are pushing twice as deep—toward magma-heated rock formations exceeding 420 degrees—where steam packs up to ten times the enthalpy per well.',
          'Pairing that steady thermal output with grid-scale electrolyzers allows Nordic utilities to synthesize green hydrogen during surplus North Sea wind hours, then scale back smoothly whenever continental demand spikes.',
        ],
        embedGalleryAfter: true,
      },
      {
        id: 'section-mineral-capture',
        numeral: '02',
        heading: 'Turning Exhaust Into Stone',
        paragraphs: [
          'Deep volcanic steam naturally brings trace carbon dioxide and hydrogen sulfide to the surface. Rather than venting non-condensable gases, operators dissolve them into pressurized reinjection water and pump the mixture back down into porous basalt.',
          'Within twenty-four months, dissolved carbon reacts with calcium and magnesium in the dark rock to crystallize permanently as white carbonate veins—locking emissions safely beneath the moss.',
        ],
        embedPrimaryPollAfter: true,
      },
    ],
    gallery: [
      {
        id: 'geo-1',
        plateNumber: '01',
        src: '/src/assets/images/related_geothermal_station_1795199041835.jpg',
        alt: 'Stainless steel geothermal pipes curving over mossy volcanic rocks toward steam stacks',
        title: 'Hellisheiði High-Pressure Manifold',
        location: 'Southwest Iceland · 64.037° N',
        photographer: 'Sigrún Jónsdóttir',
        caption: 'Expansion loops allow 400-meter steel segments to flex silently as superheated steam temperatures fluctuate.',
      },
      {
        id: 'geo-2',
        plateNumber: '02',
        src: '/src/assets/images/gallery_storm_gate_1795199042449.jpg',
        alt: 'Coastal industrial hydraulic gate infrastructure under overcast North Sea clouds',
        title: 'North Sea Grid Landing Corridor',
        location: 'Western North Sea · 53.412° N',
        photographer: 'Henrik Lindqvist',
        caption: 'Coastal converter stations balance intermittent offshore wind surges against steady Nordic hydro and geothermal baseload.',
      },
    ],
    primaryPoll: {
      id: 'poll-grid-priority',
      kicker: 'Reader Poll · Clean Baseload Strategy',
      question: 'Which zero-carbon baseload technology deserves priority public R&D through 2035?',
      contextNote: 'Vote to compare reader expectations across energy technologies.',
      closesLabel: 'Poll closes Nov 29, 2026',
      options: [
        { id: 'g-1', label: 'Enhanced deep geothermal & supercritical steam wells', votes: 540, plannerVotes: 260, residentVotes: 280 },
        { id: 'g-2', label: 'Long-distance HVDC subsea interconnectors', votes: 412, plannerVotes: 210, residentVotes: 202 },
        { id: 'g-3', label: 'Iron-air & multi-day utility battery storage', votes: 389, plannerVotes: 185, residentVotes: 204 },
        { id: 'g-4', label: 'Small modular nuclear reactors for industrial heat', votes: 318, plannerVotes: 140, residentVotes: 178 },
      ],
    },
    secondaryPoll: {
      id: 'poll-basalt-secondary',
      kicker: 'Dispatch Follow-Up',
      question: 'Should heavy data centers co-locate directly beside geothermal steam fields?',
      contextNote: 'Evaluating industrial siting tradeoffs in fragile volcanic landscapes.',
      closesLabel: '912 responses',
      options: [
        { id: 'bs-1', label: 'Yes, if waste heat feeds local district greenhouses', votes: 615, plannerVotes: 300, residentVotes: 315 },
        { id: 'bs-2', label: 'No, reserve pristine geothermal capacity for local grid use', votes: 297, plannerVotes: 140, residentVotes: 157 },
      ],
    },
    marginNotes: [
      {
        id: 'gmn-1',
        index: 'Note 01',
        term: 'Supercritical Geothermal Fluid',
        definition:
          'Water heated above 374°C and 22.1 MPa pressure where liquid and gas phases merge, dramatically multiplying turbine power output per borehole.',
        sourceRef: 'Iceland Deep Drilling Project Technical Report',
      },
    ],
    keyMetrics: [
      { label: 'Borehole Depth', value: '4.6', unit: 'kilometers' },
      { label: 'Baseload Uptime', value: '96.4%', unit: 'annual capacity' },
      { label: 'Mineralization Time', value: '24', unit: 'months to calcite' },
    ],
    footnotes: [
      { id: 1, citation: 'Carbfix Subsurface Mineralization Verification Ledger (2025).', source: 'Reykjavík Energy Archive' },
    ],
    initialComments: [
      {
        id: 'gc-1',
        author: 'Astrid Lindqvist',
        role: 'Grid Analyst',
        location: 'Stockholm',
        timestamp: '4 hours ago',
        createdAtMs: Date.now() - 4 * 3600 * 1000,
        body: 'Closed-loop mineralization in basalt is one of the few carbon-capture processes with rock-solid geological permanence.',
        upvotes: 22,
      },
    ],
    relatedIds: ['amphibious-metropolis', 'timber-eight-stories', 'subterranean-cathedral'],
  },

  'timber-eight-stories': {
    id: 'timber-eight-stories',
    section: 'Culture',
    kicker: 'Architecture & Housing · Zurich',
    title: 'Timber at Eight Stories: Inside Zurich’s Post-Concrete Housing Mandate',
    deck: 'By replacing poured structural slabs with precision-milled alpine spruce and larch louvers, Swiss housing cooperatives are cutting embodied carbon in half while accelerating neighborhood assembly.',
    publishedAt: 'November 15, 2026',
    readTimeMinutes: 7,
    author: {
      name: 'Nadia Keller',
      initials: 'NK',
      role: 'Architecture Critic',
      desk: 'Zurich & Basel',
      bio: 'Nadia Keller writes on cooperative housing, structural timber craft, and adaptive urban zoning.',
    },
    hero: {
      src: '/src/assets/images/related_mass_timber_1795199040027.jpg',
      alt: 'Upward architectural view of an eight-story cross-laminated timber residential block with warm larch louvers and planted balconies',
      caption:
        'Fig. 1 — Untreated European larch louvers shade deep communal balconies at the Kalkbreite-Nord cooperative block in Zurich.',
      credit: 'Lukas Meyer for The Meridian',
    },
    leadParagraph:
      'Walk past a municipal construction site in Zurich-West on a Tuesday morning and the loudest sound you hear is not a concrete mixer or jackhammer, but the rhythmic whir of cordless torque drivers fastening pre-cut spruce beams craned straight off flatbed trailers.',
    sections: [
      {
        id: 'section-precision-joinery',
        numeral: '01',
        heading: 'From Forest Inventory to Crane Hook',
        paragraphs: [
          'Cross-laminated timber (CLT) panels arrive on site milled to sub-millimeter tolerances, complete with pre-routed electrical chases and acoustic cork gaskets. An eight-story cooperative wing that once demanded fourteen months of formwork and curing now tops out in eleven weeks.',
          'Crucially, municipal procurement rules now score embodied carbon alongside bid price—tilting the ledger decisively away from high-clinker Portland cement.',
        ],
        embedGalleryAfter: true,
      },
      {
        id: 'section-acoustic-craft',
        numeral: '02',
        heading: 'Solving the Acoustic Myth',
        paragraphs: [
          'Early wooden apartment blocks suffered from low-frequency footfall resonance. Modern Swiss assemblies layer crushed limestone ballast over cross-laminated decks, delivering acoustic isolation equal to poured concrete at a fraction of the dead load.',
        ],
        embedPrimaryPollAfter: true,
      },
    ],
    gallery: [
      {
        id: 'tmb-1',
        plateNumber: '01',
        src: '/src/assets/images/related_mass_timber_1795199040027.jpg',
        alt: 'Cross-laminated mass timber facade with larch sunshades and greenery',
        title: 'Larch Louver & Balustrade Assembly',
        location: 'Zurich, Switzerland · 47.376° N',
        photographer: 'Lukas Meyer',
        caption: 'Unpainted larch weathers naturally to silver-gray over five winters without chemical sealants.',
      },
      {
        id: 'tmb-2',
        plateNumber: '02',
        src: '/src/assets/images/gallery_sponge_plaza_1795199042016.jpg',
        alt: 'Stepped public courtyard plaza framed by brick and timber urban housing',
        title: 'Permeable Cooperative Courtyard',
        location: 'Basel-Nord · 47.559° N',
        photographer: 'Freja Nørgaard',
        caption: 'Sunken courtyard retention basins handle roof runoff directly inside cooperative blocks.',
      },
    ],
    primaryPoll: {
      id: 'poll-timber-adoption',
      kicker: 'Reader Poll · Urban Housing Materials',
      question: 'Would you prefer to live in a multi-story mass-timber apartment over conventional concrete?',
      contextNote: 'Comparing resident sentiment on acoustics, aesthetics, and climate impact.',
      closesLabel: 'Poll closes Nov 30, 2026',
      options: [
        { id: 't-1', label: 'Yes — warmer interiors and lower carbon footprint', votes: 790, plannerVotes: 380, residentVotes: 410 },
        { id: 't-2', label: 'Depends on verified fire-char and acoustic ratings', votes: 342, plannerVotes: 165, residentVotes: 177 },
        { id: 't-3', label: 'No — I still prefer masonry or concrete construction', votes: 141, plannerVotes: 42, residentVotes: 99 },
      ],
    },
    secondaryPoll: {
      id: 'poll-timber-secondary',
      kicker: 'Zoning Preference',
      question: 'Should cities waive height caps by 2 stories for verified mass-timber projects?',
      contextNote: 'Policy incentive tested across three European municipalities.',
      closesLabel: '1,120 responses',
      options: [
        { id: 'tz-1', label: 'Yes — incentivize low-carbon structural framing', votes: 814, plannerVotes: 405, residentVotes: 409 },
        { id: 'tz-2', label: 'No — keep uniform height limits regardless of material', votes: 306, plannerVotes: 112, residentVotes: 194 },
      ],
    },
    marginNotes: [
      {
        id: 'tmn-1',
        index: 'Note 01',
        term: 'Embodied Carbon Delta',
        definition:
          'Each cubic meter of structural spruce sequesters roughly 0.8 metric tons of atmospheric CO2 while avoiding ~400 kg of cement kiln emissions.',
        sourceRef: 'ETH Zurich Structural Timber Lab, 2025',
      },
    ],
    keyMetrics: [
      { label: 'Structural Erection', value: '11', unit: 'weeks (8 stories)' },
      { label: 'Embodied Carbon Cut', value: '52%', unit: 'vs. reinforced concrete' },
      { label: 'Building Weight', value: '1/5', unit: 'foundation load' },
    ],
    footnotes: [
      { id: 1, citation: 'City of Zurich Cooperative Housing Embodied Carbon Benchmark (2025).', source: 'Amt für Städtebau Zürich' },
    ],
    initialComments: [
      {
        id: 'tc-1',
        author: 'Jonas Weber',
        role: 'Structural Engineer',
        location: 'Bern',
        timestamp: '6 hours ago',
        createdAtMs: Date.now() - 6 * 3600 * 1000,
        body: 'Limestone grit ballast inside hollow box slabs completely transformed timber acoustics. Walking through newer eight-story blocks feels indistinguishable from stone.',
        upvotes: 27,
      },
    ],
    relatedIds: ['amphibious-metropolis', 'basalt-and-steam', 'marshlands-seawalls'],
  },

  'subterranean-cathedral': {
    id: 'subterranean-cathedral',
    section: 'Science',
    kicker: 'Hydrology & Engineering · Greater Tokyo',
    title: 'The Subterranean Cathedral: Inside Tokyo’s 6.3-Billion-Litre Storm Vault',
    deck: 'Twenty-two meters beneath suburban soccer pitches in Kasukabe, fifty-nine concrete columns hold back typhoon river surges before four jet-derived turbines hurl the water toward Tokyo Bay.',
    publishedAt: 'November 12, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Kenji Takahashi',
      initials: 'KT',
      role: 'East Asia Infrastructure Desk',
      desk: 'Tokyo',
      bio: 'Kenji Takahashi covers seismic engineering, subterranean transit, and coastal flood defense in Japan.',
    },
    hero: {
      src: '/src/assets/images/gallery_tokyo_reservoir_1795199041482.jpg',
      alt: 'Monumental subterranean concrete pillars inside Tokyo flood discharge chamber',
      caption:
        'Fig. 1 — Maintenance engineers inspect the pressure-control chamber floor between autumn typhoon alerts.',
      credit: 'Kenji Takahashi for The Meridian',
    },
    leadParagraph:
      'Descending the damp concrete stairwell beneath Showa Sports Park feels less like entering a civil utility than stepping into an ancient stone temple carved by giants.',
    sections: [
      {
        id: 'section-pressure-control',
        numeral: '01',
        heading: 'Taming Five Rivers at Once',
        paragraphs: [
          'When typhoons stall over the Kanto Plain, shallow urban rivers swell faster than surface embankments can discharge. Five vertical intake shafts—each large enough to swallow the Statue of Liberty—siphon overflow into a 6.3-kilometer tunnel bored fifty meters underground.',
          'Before water hits the main pump house, it enters the pillared cathedral to bleed off ferocious hydraulic momentum.',
        ],
        embedPrimaryPollAfter: true,
      },
    ],
    gallery: [
      {
        id: 'tok-1',
        plateNumber: '01',
        src: '/src/assets/images/gallery_tokyo_reservoir_1795199041482.jpg',
        alt: 'Subterranean concrete flood chamber pillars',
        title: 'Pressure Equalization Hall',
        location: 'Kasukabe, Saitama · 35.997° N',
        photographer: 'Kenji Takahashi',
        caption: 'Columns are anchored deep in bedrock to stop the empty chamber from floating like a submarine when groundwater rises.',
      },
      {
        id: 'tok-2',
        plateNumber: '02',
        src: '/src/assets/images/hero_tidal_park_1795199041691.jpg',
        alt: 'Stepped waterfront tidal park promenade',
        title: 'Surface Counterpart: Stepped Embankment',
        location: 'Rotterdam · 51.908° N',
        photographer: 'Henrik Lindqvist',
        caption: 'Surface tidal parks complement deep tunnels where dense urban cores leave room along industrial quays.',
      },
    ],
    primaryPoll: {
      id: 'poll-tokyo-model',
      kicker: 'Reader Poll · Megacity Resilience',
      question: 'Should mega-cities prioritize deep underground flood tunnels or surface buyouts?',
      contextNote: 'Weighing multi-billion-dollar gray engineering against surface retreat.',
      closesLabel: 'Poll closes Dec 1, 2026',
      options: [
        { id: 'tk-1', label: 'Hybrid: deep vaults for dense cores, parks on the periphery', votes: 690, plannerVotes: 360, residentVotes: 330 },
        { id: 'tk-2', label: 'Surface green corridors wherever land is available', votes: 290, plannerVotes: 110, residentVotes: 180 },
        { id: 'tk-3', label: 'Deep tunnels to preserve existing urban density', votes: 215, plannerVotes: 120, residentVotes: 95 },
      ],
    },
    secondaryPoll: {
      id: 'poll-tokyo-secondary',
      kicker: 'Civic Access',
      question: 'Should major public infrastructure vaults open for architectural tours when dry?',
      contextNote: 'Assessing civic transparency in municipal engineering.',
      closesLabel: '840 responses',
      options: [
        { id: 'tks-1', label: 'Yes — builds public support for unseen capital spending', votes: 745, plannerVotes: 390, residentVotes: 355 },
        { id: 'tks-2', label: 'No — restrict access strictly to maintenance personnel', votes: 95, plannerVotes: 40, residentVotes: 55 },
      ],
    },
    marginNotes: [
      {
        id: 'tokmn-1',
        index: 'Note 01',
        term: 'Jet-Engine Pump Turbines',
        definition:
          'Four 14,000-horsepower gas-turbine pumps evacuate 200 cubic meters of water per second—emptying a standard 25-meter swimming pool in less than two seconds.',
        sourceRef: 'MLIT Edogawa River Office',
      },
    ],
    keyMetrics: [
      { label: 'Tunnel Length', value: '6.3', unit: 'kilometers' },
      { label: 'Pillar Weight', value: '500', unit: 'metric tons each' },
      { label: 'Flood Reduction', value: '90%', unit: 'inundated homes' },
    ],
    footnotes: [
      { id: 1, citation: 'Metropolitan Area Outer Underground Discharge Channel Annual Operations Summary.', source: 'MLIT Japan' },
    ],
    initialComments: [],
    relatedIds: ['amphibious-metropolis', 'marshlands-seawalls', 'basalt-and-steam'],
  },

  'marshlands-seawalls': {
    id: 'marshlands-seawalls',
    section: 'World',
    kicker: 'Coastal Ecology · North Atlantic',
    title: 'Marshlands as Seawalls: Why Salt Reeds Outlast Granite Riprap',
    deck: 'Long dismissed as wastelands to be drained, restored tidal cordgrass meadows are proving cheaper to maintain—and more adaptable to rising water—than armored stone revetments.',
    publishedAt: 'November 9, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Elena Vance',
      initials: 'EV',
      role: 'Senior Infrastructure Correspondent',
      desk: 'Boston & Antwerp',
      bio: 'Elena Vance covers maritime engineering, urban hydrology, and municipal climate finance across Northern Europe and East Asia.',
    },
    hero: {
      src: '/src/assets/images/gallery_marsh_boardwalk_1795199041807.jpg',
      alt: 'Elevated timber boardwalk crossing restored coastal salt marsh in soft fog',
      caption:
        'Fig. 1 — Elevated cedar paths invite pedestrians across restored salt marshes without compacting delicate peat root mats.',
      credit: 'Henrik Lindqvist for The Meridian',
    },
    leadParagraph:
      'Every granite boulder dropped along a harbor edge begins settling the moment storm waves pound the seabed beneath it. Living salt marshes do the opposite: their dense root networks trap estuarine silt, steadily building elevation alongside rising tides.',
    sections: [
      {
        id: 'section-living-elevation',
        numeral: '01',
        heading: 'Sediment That Tracks the Sea',
        paragraphs: [
          'By combining submerged oyster reefs offshore with native Phragmites and cordgrass meadows behind them, coastal municipalities create self-healing buffers that absorb storm wake while restoring juvenile fish nurseries.',
          'Over a thirty-year lifecycle, living shorelines average less than half the repair cost of traditional riprap slopes.',
        ],
        embedPrimaryPollAfter: true,
      },
    ],
    gallery: [
      {
        id: 'msh-1',
        plateNumber: '01',
        src: '/src/assets/images/gallery_marsh_boardwalk_1795199041807.jpg',
        alt: 'Cedar boardwalk in restored marshland',
        title: 'Intertidal Reed Buffer',
        location: 'Scheldt Estuary · 51.230° N',
        photographer: 'Henrik Lindqvist',
        caption: 'Peat accumulation lifts marsh elevation 4–7 millimeters annually when sediment supply remains unobstructed.',
      },
    ],
    primaryPoll: {
      id: 'poll-marsh-tradeoff',
      kicker: 'Reader Poll · Coastal Buffers',
      question: 'Should ports allocate 15% of industrial quay frontage to living marsh buffers?',
      contextNote: 'Testing support for ecological setbacks in working commercial harbors.',
      closesLabel: 'Poll closes Nov 28, 2026',
      options: [
        { id: 'ms-1', label: 'Yes — ecological buffers protect behind-the-quay assets', votes: 612, plannerVotes: 295, residentVotes: 317 },
        { id: 'ms-2', label: 'Only outside active deep-water container berths', votes: 428, plannerVotes: 240, residentVotes: 188 },
        { id: 'ms-3', label: 'No — keep commercial ports purely industrial', votes: 89, plannerVotes: 30, residentVotes: 59 },
      ],
    },
    secondaryPoll: {
      id: 'poll-marsh-secondary',
      kicker: 'Public Access',
      question: 'What makes a coastal restoration project feel most valuable to local residents?',
      contextNote: 'Feedback from harbor-adjacent neighborhoods.',
      closesLabel: '710 responses',
      options: [
        { id: 'mss-1', label: 'Continuous walking and cycling boardwalks', votes: 460, plannerVotes: 190, residentVotes: 270 },
        { id: 'mss-2', label: 'Measurable flood-insurance premium reductions', votes: 250, plannerVotes: 130, residentVotes: 120 },
      ],
    },
    marginNotes: [
      {
        id: 'mmn-1',
        index: 'Note 01',
        term: 'Vertical Accretion',
        definition:
          'The natural upward growth of marsh soil as plant stems slow tidal currents and trap suspended estuarine clay and organic detritus.',
        sourceRef: 'Estuarine Coastal & Shelf Science Journal',
      },
    ],
    keyMetrics: [
      { label: 'Maintenance Cost', value: '-54%', unit: 'over 30 years' },
      { label: 'Vertical Accretion', value: '6 mm', unit: 'avg / year' },
    ],
    footnotes: [
      { id: 1, citation: 'Scheldt Sigma Plan Tidal Marsh Longevity Audit (2024).', source: 'Flanders Hydraulics Research' },
    ],
    initialComments: [],
    relatedIds: ['amphibious-metropolis', 'timber-eight-stories', 'subterranean-cathedral'],
  },
};

export const LEAD_ARTICLE_ID = 'amphibious-metropolis';

export const SECTION_FEATURE_MAP: Record<string, string> = {
  World: 'marshlands-seawalls',
  Cities: 'amphibious-metropolis',
  Climate: 'basalt-and-steam',
  Science: 'subterranean-cathedral',
  Culture: 'timber-eight-stories',
};
