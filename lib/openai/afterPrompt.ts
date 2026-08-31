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

IMPORTANT EDITING MODE:

Treat this task as a LOCALIZED PHOTO EDIT of the provided original photograph,
NOT as generating a new portrait inspired by the person.

Use the original photograph as the visual source of truth for the person's face.

Keep the original facial pixels and facial appearance as unchanged as reasonably possible
except for reversible grooming-related surface changes explicitly requested below.

Do not reinterpret, reconstruct, idealize, beautify, or regenerate the person's facial anatomy.

The safest successful result is:

"the original photograph with professionally improved hair, eyebrows, skin presentation, beard grooming, and grooming details."

If a requested improvement risks making the person look like a different individual,
reduce that improvement until the person's identity is unmistakably preserved.

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

CRITICAL DISTINCTION:

Identity preservation means preserving WHO the person is.

It does NOT mean preserving the original styling or grooming appearance.

Do not preserve a weak or unchanged Before appearance merely to maintain resemblance.

The following areas are explicitly UNLOCKED for meaningful transformation:

- hairstyle silhouette
- fringe shape and direction
- forehead exposure
- parting
- hair volume and texture
- eyebrow grooming and visible shape refinement
- beard shadow and visible stubble
- temporary skin condition
- complexion presentation
- lip dryness
- grooming quality

For these reversible areas, prioritize the personalized diagnosis over visual similarity to the original styling.

The After image should preserve the person's permanent facial anatomy while intentionally creating a clearly different grooming state.

Think:

"SAME FACE, DIFFERENT GROOMING."

Do not think:

"KEEP THE WHOLE IMAGE AS SIMILAR AS POSSIBLE."

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
4. HAIR — MANDATORY VISIBLE STYLE TRANSFORMATION
==================================================

HAIR RECOMMENDATION:

${analysis.afterDirection.hair}

The hairstyle is the PRIMARY visual transformation in this After image.

Translate the personalized hair recommendation into a clearly different,
professionally cut and professionally styled hairstyle.

IMPORTANT:

Do NOT merely clean up, comb, neaten, or add subtle texture to the existing hairstyle.

Do NOT preserve the original hairstyle simply because it already looks acceptable.

Do NOT produce an After image that could reasonably be described as:

"the same haircut, just styled a little better."

Unless the personalized diagnosis EXPLICITLY recommends keeping the current hairstyle substantially unchanged,
the After must show a clearly recognizable hairstyle transformation.

==================================================
MANDATORY HAIRSTYLE DIFFERENCE
==================================================

Compare the proposed hairstyle directly with the original hairstyle.

The After should visibly change AT LEAST TWO of the following characteristics when supported by the personalized diagnosis:

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
- overall silhouette

These differences must be visible at normal smartphone viewing size.

Small strand-level differences do NOT count.

Subtle tidying does NOT count.

Slightly increasing texture alone does NOT count.

The overall hairstyle should be recognizably more intentional and professionally designed.

==================================================
FRINGE AND SILHOUETTE
==================================================

Pay particular attention to the fringe and overall silhouette.

If the original hairstyle has:

- a heavy fringe
- a flat fringe
- a straight-down fringe
- excessive side volume
- a rounded or undefined silhouette
- little top volume

and the personalized diagnosis supports changing these characteristics,

make the difference clearly visible.

Appropriate transformations may include:

- opening part of the forehead
- changing the direction of the fringe
- creating a clearer part
- creating controlled top volume
- reducing excessive side heaviness
- refining the temple area
- creating more intentional separation
- creating a cleaner vertical or three-dimensional silhouette
- adding believable professional movement and texture

Do not default to preserving the original fringe.

The fringe is a major visual component of the makeover and should change when the diagnosis supports it.

==================================================
PERSONALIZED SALON RESULT
==================================================

The hairstyle must remain consistent with:

- ${analysis.afterDirection.hair}
- this person's face
- this person's natural hairline
- this person's believable hair density
- this person's apparent hair texture
- ${analysis.targetImpression}

Do NOT choose a random fashionable hairstyle.

Do NOT ignore the personalized diagnosis merely to create a larger difference.

The transformation must be:

PERSONALIZED + VISIBLE + REALISTIC.

Imagine that the person showed the AKANUKE.AI diagnosis to a skilled Japanese men's hairstylist,
received an appropriate haircut,
and then received professional salon styling.

The viewer should think:

"He clearly changed his hairstyle at a good men's salon."

Not:

"He styled the same hair a little more carefully."

==================================================
HAIR IDENTITY SAFETY
==================================================

Changing the hairstyle does NOT mean changing the person's identity.

Preserve:

- natural hairline
- forehead anatomy
- head shape
- facial anatomy
- believable hair density
- believable hair growth direction
- realistic hair texture

Do NOT:

- move the natural hairline unrealistically
- invent excessive hair density
- hide identity changes behind the hairstyle
- alter forehead anatomy
- alter face shape
- alter jaw shape
- create a wig-like result
- create an extreme unrelated fashion hairstyle

If a stronger hairstyle transformation is needed,
change the CUT, FRINGE, PARTING, VOLUME, TEXTURE, and SILHOUETTE.

Never change facial anatomy to make the hairstyle appear more flattering.

==================================================
HAIR FINAL CHECK
==================================================

Before finalizing, compare the After hairstyle with the original hairstyle.

Ask:

1. Is this visibly more than simple styling or tidying?
2. Are at least TWO meaningful hairstyle characteristics clearly different when supported by the diagnosis?
3. Is the difference obvious on a smartphone?
4. Does it follow the personalized hair recommendation?
5. Does it still look realistically achievable from the person's original hair?

If the hairstyle improvement is too subtle:

increase only the reversible hairstyle transformation
while keeping the original face completely unchanged.

Do not increase hairstyle transformation if doing so causes facial identity drift.

If answer 4 or 5 is NO:

correct the hairstyle while preserving a clearly visible transformation.

The final hairstyle must satisfy BOTH:

"clearly different from Before"

AND

"realistically achievable for this exact person."

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

Preserve:

- camera perspective
- head orientation
- facial expression
- framing
- pose
- body proportions
- general lighting direction
- background
- clothing

However, photographic continuity must NOT reduce the requested grooming transformation.

Do not preserve the original hairstyle, eyebrow condition, beard shadow, skin condition, or grooming quality simply because they are part of the original photograph.

The photograph should remain clearly continuous,
while the reversible beauty and grooming elements should be intentionally transformed.

Do not create a completely different portrait.

The result should feel like:

"the exact same person photographed from the same setup after a genuinely noticeable professional grooming makeover"

rather than:

"the same person with only tiny cosmetic corrections"

and rather than:

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

1. EXACT FACIAL IDENTITY PRESERVATION
2. PHOTOREALISTIC CONTINUITY WITH THE ORIGINAL PHOTO
3. REALISTIC ACHIEVABILITY
4. PERSONALIZED HAIRSTYLE IMPROVEMENT
5. EYEBROW, SKIN, BEARD, AND GROOMING IMPROVEMENT
6. VISIBLE BEFORE / AFTER DIFFERENCE

Identity preservation is the non-negotiable requirement.

A slightly more conservative makeover of the exact same person
is always better than a stronger makeover that makes the person look different.

If there is any uncertainty about whether an edit changes facial identity,
preserve the original facial feature.

The final result must look like:

"THIS EXACT PERSON after professional grooming."

Never:

"A better-looking person who resembles the original."

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