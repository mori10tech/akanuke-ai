import type { AkanukeAnalysis } from "./schemas";

export function createAfterImagePrompt(
  analysis: AkanukeAnalysis,
) {
  return `
Edit the provided original photograph to create a highly photorealistic and clearly improved "After" image for the Japanese men's beauty service "AKANUKE.AI".

==================================================
CORE OBJECTIVE
==================================================

Create a realistic TOTAL BEAUTY MAKEOVER of THE EXACT SAME PERSON.

The result should represent what this person could realistically achieve through:

- a suitable professional haircut
- professional salon hairstyling
- professional men's eyebrow grooming
- several weeks of consistent skincare
- excellent skin hydration
- a close clean shave
- realistic beard-shadow correction
- subtle men's BB cream
- subtle concealer and color correction
- natural lip care
- refined facial grooming

The result must clearly look more polished and 垢抜けた than the original.

However:

THE PERSON'S PERMANENT FACIAL IDENTITY MUST NOT CHANGE.

The transformation must come from changeable grooming and styling elements,
not from redesigning the person's face.

The desired result is:

"SAME PERSON + CLEARLY BETTER HAIR + BETTER EYEBROWS + BETTER SKIN + BETTER GROOMING."

Not:

"A more attractive different person."

==================================================
1. ABSOLUTE IDENTITY LOCK
==================================================

Treat the original face as the identity reference.

Preserve with extremely high fidelity:

- facial bone structure
- face shape
- jaw shape
- chin shape
- cheek structure
- natural eye shape
- natural eye size
- eye spacing
- eye position
- eyelid characteristics
- eyebrow-to-eye distance
- nose shape
- nose width
- nose length
- nostril shape
- mouth shape
- lip shape
- lip proportions
- ears
- natural facial proportions
- distinctive facial characteristics
- apparent age
- ethnicity
- head orientation
- camera perspective
- facial expression

Do NOT beautify the person by changing anatomy.

Never:

- enlarge or sharpen the eyes
- change eyelids
- make the eyes more symmetrical
- reshape the nose
- narrow the nose
- reshape the jaw
- narrow or shorten the face
- enlarge or reshape the lips
- change cheek structure
- create cosmetic-surgery-like improvements
- replace distinctive characteristics
- turn the person into a conventionally attractive model

If there is a conflict between:

A. making the person more attractive
and
B. preserving the person's facial identity

ALWAYS choose B.

IMPORTANT:

Identity preservation applies to permanent anatomy.

It does NOT require preserving:

- hairstyle
- eyebrow grooming
- beard shadow
- stubble
- skin condition
- temporary redness
- temporary dullness
- lip dryness
- cosmetic complexion
- grooming quality

These changeable elements SHOULD visibly improve.

==================================================
2. PERSONALIZED TARGET
==================================================

TARGET IMPRESSION:

${analysis.targetImpression}

CURRENT IMPRESSION:

${analysis.currentImpression}

Use the personalized AKANUKE.AI diagnosis below as the basis of the makeover.

HAIR:
${analysis.afterDirection.hair}

EYEBROWS:
${analysis.afterDirection.eyebrows}

SKIN:
${analysis.afterDirection.skin}

GROOMING:
${analysis.afterDirection.grooming}

STYLING:
${analysis.afterDirection.styling}

Convert these recommendations into visible changes in the photograph.

Do not treat them merely as written advice.

==================================================
3. TRANSFORMATION PRIORITY
==================================================

Apply visual changes in this priority order:

1. HAIRSTYLE
2. EYEBROWS
3. SKIN AND COMPLEXION
4. BEARD SHADOW / FACIAL HAIR
5. GENERAL FACIAL GROOMING
6. CLOTHING

The primary transformation must happen through grooming.

Do not create the impression of improvement mainly through:

- different facial anatomy
- different camera angle
- different facial expression
- dramatic lighting
- background changes
- clothing changes

==================================================
4. HAIR — CLEARLY CHANGE THE STYLE
==================================================

HAIR RECOMMENDATION:

${analysis.afterDirection.hair}

Translate this recommendation into a clearly visible professional haircut and styling result.

Do NOT simply make the existing hairstyle slightly neater.

When appropriate, concretely determine:

- fringe shape
- fringe direction
- forehead exposure
- parting position
- top volume
- side volume
- temple silhouette
- hair around the ears
- layering
- texture
- separation
- movement
- styling direction
- overall hair silhouette

The hairstyle should look intentionally selected for:

- this person's face
- this person's existing hair characteristics
- the target impression
- the personalized diagnosis

Unless the personalized recommendation explicitly calls for preserving the current hairstyle,
the After hairstyle should show a noticeable salon-level transformation.

When appropriate, at least TWO major hairstyle characteristics should visibly change.

Examples include:

- fringe shape
- forehead exposure
- parting
- top volume
- side volume
- overall silhouette
- texture
- movement

If the original hair is heavy or flat,
consider a cleaner fringe, more forehead exposure,
better top volume, reduced side heaviness,
and a more intentional silhouette when consistent with the diagnosis.

If the current hairstyle already resembles the recommended style,
increase the haircut and professional styling refinement enough that the difference remains clearly visible.

The desired reaction is:

"He went to a good Japanese men's hair salon."

Not:

"He combed his hair slightly differently."

Preserve:

- natural hairline
- believable hair density
- realistic hair texture
- realistic hair growth

Do NOT create:

- unrealistic hair density
- a wig-like appearance
- an unrelated extreme fashion hairstyle
- a dramatically different natural hairline

==================================================
5. EYEBROWS — PROFESSIONAL GROOMING
==================================================

EYEBROW RECOMMENDATION:

${analysis.afterDirection.eyebrows}

Preserve the person's natural eyebrow identity while giving the eyebrows a clearly visible professional grooming improvement.

When appropriate:

- remove stray hairs
- clean the lower edge
- remove unnecessary hairs between the brows
- refine the tail
- improve visual left-right balance
- clarify the natural shape
- maintain masculine natural thickness

The result should resemble a realistic Japanese men's eyebrow salon treatment.

The eyebrow improvement should be noticeable when Before and After are viewed side by side on a smartphone.

Do NOT:

- make eyebrows excessively thin
- make eyebrows excessively dark
- heavily draw them
- make them unnaturally geometric
- change the eyes themselves

Improve the eye-area impression through eyebrow grooming,
not through changing eye anatomy.

==================================================
6. SKIN AND COMPLEXION — VISIBLE BUT REALISTIC
==================================================

SKIN RECOMMENDATION:

${analysis.afterDirection.skin}

Create a visibly:

- fresher
- clearer
- cleaner
- more even
- healthier-looking
- naturally hydrated

complexion.

When appropriate:

- reduce dullness
- reduce temporary redness
- reduce uneven-looking tone
- reduce excessive shine
- reduce minor discoloration
- improve under-eye presentation
- improve visible lip condition

Aim for approximately one natural-looking tone of improvement.

The difference must come from the FACE itself.

Do not simply brighten the entire photograph.

Simulate the realistic combined effect of:

- consistent skincare
- moisturizer
- UV care
- subtle men's BB cream
- subtle concealer
- natural color correction

Preserve:

- pores
- skin texture
- realistic facial detail
- small natural imperfections

Do NOT:

- whiten the person unnaturally
- erase all pores
- create porcelain skin
- create airbrushed skin
- apply an obvious digital beauty filter

The viewer should see:

"well-cared-for real skin"

rather than:

"AI-generated perfect skin."

==================================================
7. BEARD SHADOW AND FACIAL HAIR
==================================================

Inspect the original image carefully for:

- beard shadow
- upper-lip shadow
- chin shadow
- jaw shadow
- visible stubble
- uneven facial-hair darkness

If present, substantially reduce it through the realistic visual effect of:

- a close clean shave
- color correction
- men's BB cream
- subtle concealer

At smartphone viewing size,
the mouth, chin, and jaw area should appear visibly cleaner.

Preserve:

- chin anatomy
- jaw anatomy
- mouth shape
- natural skin texture

Do not blur the lower face.

If beard shadow is not present,
do not invent unnecessary changes.

==================================================
8. GENERAL GROOMING
==================================================

GROOMING RECOMMENDATION:

${analysis.afterDirection.grooming}

Increase the visible impression of:

- cleanliness
- freshness
- refinement
- approachability
- intentional grooming

When appropriate:

- moisturize dry-looking lips
- improve temporary tired-looking complexion
- improve facial-hair grooming
- clean up minor visible grooming issues

Do not invent problems that are not visible.

Do not alter permanent facial anatomy.

==================================================
9. CLOTHING — VERY LOW PRIORITY
==================================================

STYLING RECOMMENDATION:

${analysis.afterDirection.styling}

Keep clothing as close to the original photograph as reasonably possible.

Clothing transformation priority:

2 / 10

Do NOT use clothing as the primary source of the Before / After difference.

Prefer preserving:

- the same T-shirt
- the same sweatshirt
- the same hoodie
- the same shirt
- the same jacket

Minor improvements in presentation are acceptable.

The viewer should understand that the transformation came from:

HAIR + EYEBROWS + SKIN + GROOMING

rather than fashion.

==================================================
10. BEFORE / AFTER CONSISTENCY
==================================================

Maintain strong photographic continuity with the original.

Preserve as much as reasonably possible:

- camera perspective
- head orientation
- facial expression
- framing
- pose
- body proportions
- general lighting direction
- background
- clothing

Do not create a completely different portrait.

The result should feel like:

"the same photograph taken after professional grooming"

rather than:

"a new photoshoot of a similar-looking person."

==================================================
11. REQUIRED VISIBLE DIFFERENCE
==================================================

The Before and After images will be displayed side by side on a smartphone.

At normal viewing size,
the improvement should be understandable within approximately one second.

The viewer should immediately notice improvements in several of these areas:

1. hairstyle
2. eyebrows
3. complexion
4. beard shadow or stubble
5. facial grooming
6. overall polished appearance

When applicable,
at least THREE areas should show a meaningful visible improvement.

However:

NEVER create additional transformation by changing permanent facial anatomy.

If the transformation appears too weak,
increase the following IN THIS ORDER:

1. haircut and hairstyle difference
2. eyebrow grooming
3. beard-shadow correction
4. complexion refinement
5. facial grooming

Do NOT increase:

- eye size
- eye shape
- nose attractiveness
- jaw definition through anatomical changes
- facial symmetry
- face slimming
- lip shape
- facial proportions

==================================================
12. TRANSFORMATION STRENGTH
==================================================

Target levels:

- identity preservation: 10 / 10
- realistic achievability: 9 / 10
- hairstyle transformation: 9 / 10
- eyebrow grooming: 8 / 10
- complexion improvement: 8 / 10
- beard-shadow correction when present: 9 / 10
- facial grooming: 8 / 10
- clothing transformation: 2 / 10

The result should be aspirational but believable.

It should represent this exact person's realistically achievable best-groomed appearance.

The ideal reaction is:

"Clearly the same guy, but he looks noticeably more polished and 垢抜けた."

==================================================
13. FINAL SELF-CHECK
==================================================

Before finalizing, internally compare the proposed After image directly with the provided original photograph.

IDENTITY CHECK:

Does the face unmistakably belong to the exact same person?

Compare:

- eyes
- eyelids
- nose
- mouth
- jaw
- face shape
- proportions
- distinctive characteristics

If facial anatomy appears meaningfully different,
restore the original facial anatomy.

HAIR CHECK:

Does the hairstyle show a clearly visible professional improvement?

If the silhouette is nearly identical,
increase the realistic haircut or styling transformation.

EYEBROW CHECK:

Are the eyebrows visibly cleaner and more intentional without changing their natural identity?

SKIN CHECK:

Does the complexion look visibly fresher and more even while retaining real skin texture?

BEARD CHECK:

If beard shadow was visible,
is it clearly reduced?

SMARTPHONE CHECK:

Would an ordinary viewer immediately understand the improvement when Before and After are shown side by side?

If no:

increase only realistic and reversible grooming changes.

Never solve insufficient transformation by redesigning the face.

FINAL PRIORITY:

IDENTITY MUST BE PRESERVED.
GROOMING MUST BE VISIBLY IMPROVED.

Both conditions must be satisfied.

==================================================
14. IMAGE QUALITY
==================================================

Final image requirements:

- highly photorealistic
- exact same person
- realistic Japanese men's beauty photography
- premium but believable
- clean and refined
- natural lighting
- realistic facial detail
- natural skin texture
- realistic grooming
- no text
- no labels
- no graphics
- no before/after layout
`.trim();
}