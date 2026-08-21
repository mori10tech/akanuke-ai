import type { AkanukeAnalysis } from "./schemas";

export function createAfterImagePrompt(
  analysis: AkanukeAnalysis,
) {
  return `
Create a highly photorealistic and CLEARLY IMPROVED "After" photograph by editing the provided original photograph.

This image is for the Japanese men's beauty service "AKANUKE.AI".

CORE GOAL:

Create a clearly aspirational but realistically achievable TOTAL BEAUTY MAKEOVER of THIS EXACT SAME PERSON.

Visualize how this same person could realistically look after receiving professional total grooming and styling, including:

- a hairstyle selected and finished by a skilled professional hairstylist
- professional men's eyebrow grooming
- several weeks of consistent skincare
- improved skin hydration and complexion
- an excellent close shave
- strong but natural beard-shadow correction
- subtle men's BB cream
- subtle concealer and color correction
- natural lip care
- refined facial grooming
- coordinated clothing selected to support the target impression
- professional overall presentation

This is NOT merely a cleaner or tidier version of the original person.

It should look like the person's professionally produced "best realistically achievable version."

The result must still unmistakably look like the exact same person.

Permanent facial anatomy must remain unchanged.

However, all realistically changeable beauty and grooming elements SHOULD be improved enough to create a strong visual transformation.

The ideal result is:

"SAME PERSON, PROFESSIONALLY PRODUCED, CLEARLY MORE REFINED."

When Before and After are displayed side by side,
an ordinary viewer should immediately feel:

"He looks noticeably more polished, clean, stylish, and transformed."

The result should create an aspirational reaction while remaining achievable without cosmetic surgery.

FACIAL BEAUTY TARGET:

The primary transformation must happen in the FACE and HAIR.

Do not rely on clothing, background, camera angle, or dramatic lighting to create the impression of improvement.

Aim for the realistic visual result of the same person after receiving a complete professional men's beauty treatment:

- a professionally selected haircut
- professional salon hairstyling
- professional eyebrow grooming
- several weeks of consistent skincare
- excellent skin hydration
- a very close shave
- strong but natural beard-shadow correction
- professional men's BB cream
- subtle concealer
- subtle color correction
- natural under-eye correction when appropriate
- natural lip care
- refined facial grooming

The face should look noticeably more polished, fresh, clear, and camera-ready than the original.

This should look closer to a professional men's beauty makeover result than ordinary daily grooming.

The transformation should create a clear "垢抜けた" impression while preserving the exact same person's permanent facial anatomy.

==================================================
1. IDENTITY — MUST NOT CHANGE
==================================================

Preserve the person's identity with very high fidelity.

Keep unchanged:

- facial bone structure
- face shape
- jaw structure
- natural eye shape
- natural eye size
- eye position
- nose shape
- mouth shape
- lip shape
- ears
- natural facial proportions
- distinctive facial characteristics
- apparent age range
- ethnicity
- head orientation
- camera perspective

Do NOT:

- replace the person with another person
- create a more conventionally attractive model
- redesign the face
- reshape the jaw
- slim the face unnaturally
- enlarge the eyes
- reshape the nose
- change ethnicity
- create cosmetic-surgery-like changes
- remove distinctive facial characteristics
- create unrealistic facial symmetry

IMPORTANT:

Identity preservation applies to the person's permanent facial structure.

It does NOT mean that temporary and groomable features must remain unchanged.

You SHOULD visibly improve:

- skin presentation
- beard shadow
- facial hair grooming
- eyebrows
- hairstyle
- complexion
- grooming
- clothing and styling

==================================================
2. TARGET
==================================================

TARGET IMPRESSION:

${analysis.targetImpression}

CURRENT IMPRESSION:

${analysis.currentImpression}

==================================================
3. PERSONALIZED AKANUKE.AI PLAN
==================================================

Follow this personalized analysis carefully.

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

These instructions describe changes that should be VISUALLY PRESENT in the final image whenever they are applicable to the original photograph.

Do not merely interpret them as written advice.

Actually visualize the requested grooming changes.

==================================================
4. REQUIRED VISUAL DIFFERENCE
==================================================

The Before and After images will be displayed side by side on a smartphone.

The improvement must therefore be immediately understandable at normal smartphone viewing size.

The viewer should notice:

1. cleaner and more even skin presentation
2. reduced beard shadow when present
3. professionally groomed eyebrows
4. a noticeably improved hairstyle
5. a fresher and more refined overall appearance

Do NOT produce an After image where the main visible differences are only:

- clothing
- lighting
- background
- hairstyle

The FACE must contain meaningful grooming improvements.

Facial grooming should contribute at least as much to the transformation as hairstyle and clothing.

==================================================
5. SKIN — HIGH PRIORITY
==================================================

Skin improvement is one of the most important parts of the transformation.

Create a visibly:

- brighter
- fresher
- cleaner
- more even
- healthier-looking

complexion.

When appropriate to the original photograph:

- reduce visible dullness
- reduce minor redness
- reduce uneven-looking skin tone
- reduce excessive shine
- reduce minor visible discoloration
- improve overall complexion uniformity

Aim for approximately ONE NATURAL-LOOKING TONE brighter than the original.

The perceived improvement should be clearly noticeable,
approximately equivalent to a 10-15% improvement in visible brightness and evenness.

IMPORTANT:

Do not achieve this only by making the entire photograph brighter.

The FACE itself should appear more even and refined.

Simulate the realistic combined effect of:

- consistent skincare
- moisturizer
- UV care
- subtle men's BB cream
- light complexion correction
- natural concealer where appropriate

Preserve:

- pores
- natural skin texture
- realistic facial detail
- small natural imperfections

Do NOT:

- whiten the person unnaturally
- erase all pores
- create porcelain skin
- create airbrushed skin
- apply a strong beauty filter

The finished complexion should look professionally prepared rather than merely healthier.

When visible dullness, beard shadow, redness, or uneven tone exists in the original image,
apply enough realistic complexion correction that the improvement is immediately visible.

Aim for the realistic finish of a professional men's grooming photo shoot:

- visibly more even complexion
- noticeably reduced dullness
- cleaner under-eye presentation when appropriate
- substantially reduced beard-shadow discoloration
- naturally brighter facial skin
- subtle healthy-looking moisture and clarity
- naturally improved lip condition and color when appropriate

The face should look polished and camera-ready,
while still retaining believable pores and natural skin texture.

Do not stop at a barely noticeable skincare improvement.

The result should look like excellent real-world skincare and subtle men's makeup.

PROFESSIONAL COMPLEXION FINISH:

The complexion improvement should be one of the most immediately visible differences between Before and After.

Aim for the realistic finish of professional men's grooming and natural men's makeup used for a high-quality beauty portrait.

When appropriate:

- make the facial complexion visibly clearer and more even
- reduce visible dullness substantially
- reduce uneven redness
- reduce minor discoloration
- reduce tired-looking darkness around the eyes without changing eye anatomy
- substantially reduce blue-gray beard discoloration
- give the skin a naturally hydrated appearance
- create subtle healthy-looking luminosity
- improve the visible condition of the lips
- create a clean and polished complexion

Use realistic men's BB cream, concealer, color corrector, moisturizer, and skincare as the visual reference.

The skin improvement should be STRONGER than ordinary skincare alone,
but still look like real skin rather than a digital beauty filter.

IMPORTANT:

Do not modify facial anatomy to make the person more attractive.

Do not change:

- eye shape
- eye size
- nose shape
- jaw structure
- face shape
- mouth shape

Create the stronger beauty effect through complexion, grooming, eyebrows, hair, beard-shadow correction, and presentation instead.

==================================================
6. BEARD SHADOW — HIGH PRIORITY
==================================================

Carefully inspect the original photograph for:

- blue-gray beard shadow
- upper-lip shadow
- chin shadow
- jaw shadow
- visible stubble
- uneven facial-hair darkness

IF beard shadow or stubble is visibly present:

It MUST be substantially reduced in the After image.

This is an important AKANUKE.AI transformation.

Aim for the realistic visual result of:

- a close clean shave
- orange or peach color correction
- men's BB cream
- light concealer
- natural complexion correction

The beard shadow should become MUCH LESS NOTICEABLE than in the original photograph.

At normal smartphone viewing size,
the mouth and chin area should visibly appear cleaner.

Do not merely soften the shadow slightly.

Create a clearly recognizable improvement.

However:

- preserve natural skin texture
- preserve the chin
- preserve the jaw
- preserve mouth shape
- do not blur the lower face
- do not create plastic-looking skin

If no beard shadow is visibly present,
do not invent one or make unnecessary changes.

==================================================
7. EYEBROWS — HIGH PRIORITY
==================================================

If the eyebrows are visible,
give them a clearly recognizable professional grooming improvement.

When appropriate:

- remove stray hairs
- clean the lower eyebrow edge
- clean unnecessary hairs between the eyebrows
- refine the eyebrow tail
- improve left-right visual balance
- slightly clarify the natural shape
- preserve natural masculine thickness

The result should resemble realistic professional men's eyebrow grooming.

IMPORTANT:

The difference should be visible when the Before and After images are viewed side by side on a smartphone.

Do NOT simply leave the eyebrows almost identical.

At the same time, do NOT make them:

- excessively thin
- excessively dark
- heavily drawn
- unnaturally geometric
- obviously made-up

Preserve the person's natural eyebrow identity.

The eyebrow transformation should look like the result of a professional Japanese men's eyebrow salon.

Make the improvement clearly visible while preserving the person's natural eyebrow characteristics.

A cleaner lower edge, controlled thickness, refined tail, and better overall balance should noticeably improve the eye-area impression.

Do not change the eyes themselves to improve the eye-area impression.

==================================================
8. HAIR — MAJOR TRANSFORMATION PRIORITY
==================================================

CRITICAL HAIR RULE:

The hairstyle in the After image must NOT remain substantially the same as the original hairstyle.

Unless the personalized diagnosis explicitly recommends keeping the current hairstyle,
perform a clearly visible haircut-level transformation.

The change must be obvious in the overall hair silhouette.

At least TWO of the following should change noticeably when appropriate:

- fringe shape
- forehead exposure
- parting
- top volume
- side volume
- overall silhouette
- hair length appearance
- texture and separation
- movement and styling direction

Do not interpret "same person" as "same hairstyle."

Hair is a temporary and highly changeable feature.

A nearly identical hairstyle is considered a failed transformation.

Hair should be one of the MOST VISIBLY DIFFERENT elements between the Before and After images.

Follow the personalized hair recommendation:

${analysis.afterDirection.hair}

IMPORTANT:

Do NOT default to preserving the original hairstyle.

Preserve the person's natural hair characteristics,
but actively redesign the HAIRCUT, HAIR SHAPE, and STYLING when doing so would better match the personalized recommendation.

The After image should represent:

"a real visit to a skilled Japanese men's hair salon,
including an appropriate haircut and professional styling."

This means you MAY realistically change:

- the haircut itself
- fringe length and shape
- fringe direction
- forehead exposure
- parting position
- top length appearance
- top volume
- side volume
- hair around the ears
- overall silhouette
- layering
- separation
- texture
- movement
- styling direction

The final hairstyle does NOT need to remain the same hairstyle as the Before image.

If the current hairstyle is heavy, flat, unstructured, overgrown, or does not support the target impression,
make a clearly visible haircut-level improvement.

For example, when appropriate:

- change a heavy fringe into a cleaner separated fringe
- expose more forehead
- create a natural center or off-center part
- reduce excessive side volume
- create cleaner hair around the ears
- create stronger top volume
- add visible separation and movement
- improve the overall head silhouette
- create a cleaner outline around the face

These are examples only.

Always prioritize the personalized recommendation and the person's actual facial characteristics.

CRITICAL DIFFERENCE REQUIREMENT:

When Before and After are viewed side by side,
the hairstyle improvement must be immediately noticeable.

A result where the hair is merely:

- slightly combed
- slightly neater
- slightly shinier
- minimally separated
- given only subtle texture

is TOO WEAK.

If the hairstyle still looks essentially the same as the Before image,
increase the haircut and styling transformation.

Do not be afraid to make a clearly different but realistically achievable hairstyle.

However, preserve:

- natural hairline
- realistic hair density
- realistic hair texture
- believable hair growth
- the person's identity

Do NOT:

- create a wig-like hairstyle
- invent unrealistic hair density
- dramatically alter the natural hairline
- use an extreme fashion hairstyle unrelated to the diagnosis
- change facial anatomy to make the hairstyle look better

TARGET:

The viewer should think:

"He actually changed his hairstyle at a good men's salon."

Not:

"He just styled his existing hair a little."

==================================================
9. GROOMING
==================================================

Increase the visible impression of:

- cleanliness
- freshness
- grooming
- refinement
- approachability

Where visibly appropriate, improve:

- facial hair
- beard shadow
- eyebrows
- skin presentation
- lips
- hair
- overall facial grooming

If the lips visibly appear dry,
they may look naturally moisturized.

Do not invent problems that are not visible in the original photograph.

LIPS AND EYE-AREA PRESENTATION:

When appropriate, make dry-looking lips appear naturally moisturized with subtle healthy color.

Reduce temporary tired-looking dullness around the eye area through realistic skincare and subtle complexion correction.

Do NOT enlarge, reshape, lift, or redesign the eyes.

The improved eye-area impression must come from grooming, eyebrows, complexion, and presentation rather than anatomical changes.

==================================================
10. SUBTLE MEN'S MAKEUP
==================================================

Natural men's makeup is explicitly allowed.

Use it when useful to achieve the personalized improvement plan.

This may include the realistic visual effect of:

- men's BB cream
- light concealer
- orange or peach beard-shadow corrector
- subtle complexion evening
- subtle redness correction

The makeup itself should NOT be obvious.

The viewer should think:

"He looks much cleaner and more polished."

Not:

"He is obviously wearing makeup."

==================================================
11. CLOTHING AND STYLING — KEEP MOSTLY UNCHANGED
==================================================

Clothing should remain close to the original photograph.

The main transformation must come from:

- skin presentation
- beard-shadow reduction
- eyebrow grooming
- hairstyle
- facial grooming
- overall cleanliness

Do NOT use clothing changes as the main source of improvement.

Preserve the original outfit whenever possible.

Only make very small styling adjustments if needed, such as:

- slightly cleaner presentation
- minor neckline adjustment
- small improvement in fit or layering
- slightly more refined styling of the same general outfit

Do NOT completely replace:

- hoodies
- sweatshirts
- T-shirts
- shirts
- jackets

unless the original clothing clearly conflicts with the requested target impression.

The After image should still feel like:

"the same person, wearing roughly the same kind of clothes, but with clearly improved face, hair, skin, eyebrows, beard shadow, and grooming."

The viewer should recognize that the transformation comes primarily from beauty and grooming improvements, not fashion changes.

==================================================
12. TRANSFORMATION STRENGTH
==================================================

Use a STRONG but realistic total beauty transformation.

This should be more than ordinary grooming.

The result should represent a professionally coordinated makeover using only changes that are realistically achievable without cosmetic surgery.

Target:

- identity preservation: 9 / 10
- realistic achievability: 8.5 / 10
- visible overall improvement: 10 / 10
- visible facial grooming improvement: 9.5 / 10
- skin improvement visibility: 9.5 / 10
- beard-shadow improvement when present: 9.5 / 10
- eyebrow grooming visibility: 9 / 10
- hairstyle transformation visibility: 10 / 10
- natural men's makeup visibility through its EFFECT: 9 / 10
- clothing transformation: 2 / 10

The After image should feel significantly more polished than the Before image even if the clothing remains almost unchanged.

If the transformation still looks like ordinary grooming,
increase the visible improvements to hair, skin, beard-shadow correction, eyebrows, and complexion.

Do NOT compensate by changing facial anatomy.

Do NOT compensate primarily through clothing.

The transformation must come primarily from realistic men's beauty and grooming techniques.

Do not interpret identity preservation as a reason to minimize beauty improvements.

Permanent facial anatomy must remain the same.

Temporary, cosmetic, groomable, and styling-related characteristics SHOULD visibly improve.

The final result should feel like:

"the exact same person after professional total beauty production:
a suitable haircut and salon styling,
professional eyebrow grooming,
several weeks of skincare,
a clean shave,
strong but natural beard-shadow correction,
subtle men's BB cream and concealer,
natural lip care,
and refined overall grooming while keeping the original clothing mostly unchanged."

The viewer should clearly feel a meaningful transformation.

The transformation should be strong enough to feel aspirational,
but still believable as something this same person could realistically achieve.

==================================================
13. FINAL SELF-CHECK
==================================================

Before finalizing the image, internally verify:

IDENTITY:
Does this unmistakably look like the same person?

SKIN:
Is the face visibly fresher, brighter, and more even?

BEARD SHADOW:
If beard shadow existed, is it substantially less visible?

EYEBROWS:
Are the eyebrows visibly cleaner and more intentional?

HAIR:
Does the hairstyle look professionally improved?

BALANCE:
Are facial improvements at least as noticeable as clothing improvements?

SMARTPHONE TEST:

Compare the proposed After image directly against the provided original image.

At normal smartphone viewing size,
an ordinary viewer must immediately recognize a clear transformation.

The After image must NOT look like:

- the original image with only minor retouching
- the original hairstyle with only slight rearrangement
- the same eyebrows with only tiny cleanup
- the same complexion with only subtle brightening
- a nearly identical photograph with small cosmetic corrections

If the Before and After could be mistaken for almost the same photograph,
the transformation is TOO WEAK and must be strengthened before finalizing.

When applicable, at least THREE of these areas should show a clearly visible improvement:

1. hairstyle
2. eyebrows
3. skin clarity and complexion
4. beard-shadow or stubble reduction
5. facial grooming
6. overall polished presentation

PRIORITY WHEN TRANSFORMATION IS TOO WEAK:

First increase:
1. hairstyle difference
2. eyebrow grooming
3. beard-shadow correction
4. complexion refinement
5. facial grooming

Do NOT increase transformation by changing:

- facial anatomy
- eye size
- nose shape
- jaw shape
- face shape
- age
- ethnicity
- camera angle
- dramatic lighting
- background
- clothing

The correct target is:

"Clearly the same person, but obviously more polished and 垢抜けた."

The visual improvement should be understandable within approximately one second when Before and After are viewed side by side.

HAIR FAILURE CHECK:

If the hairstyle silhouette is still almost identical to the original photograph,
the result is not acceptable.

Regenerate internally with a more clearly redesigned but realistic hairstyle
that follows the personalized recommendation.

==================================================
14. IMAGE QUALITY
==================================================

Final image requirements:

- highly photorealistic
- same exact person
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