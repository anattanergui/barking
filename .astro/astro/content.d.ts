declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"poems": {
"2026-03-26.md": {
	id: "2026-03-26.md";
  slug: "2026-03-26";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Abrupt.md": {
	id: "Abrupt.md";
  slug: "abrupt";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Absence Of Absence.md": {
	id: "Absence Of Absence.md";
  slug: "absence-of-absence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Aloneness.md": {
	id: "Aloneness.md";
  slug: "aloneness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Assumption And Perception.md": {
	id: "Assumption And Perception.md";
  slug: "assumption-and-perception";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Atman.md": {
	id: "Atman.md";
  slug: "atman";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Autopsy.md": {
	id: "Autopsy.md";
  slug: "autopsy";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Awake.md": {
	id: "Awake.md";
  slug: "awake";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Awareness.md": {
	id: "Awareness.md";
  slug: "awareness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Beholding.md": {
	id: "Beholding.md";
  slug: "beholding";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Between Silences.md": {
	id: "Between Silences.md";
  slug: "between-silences";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Bittersweet.md": {
	id: "Bittersweet.md";
  slug: "bittersweet";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Clothes.md": {
	id: "Clothes.md";
  slug: "clothes";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Cobwebs.md": {
	id: "Cobwebs.md";
  slug: "cobwebs";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Contentment.md": {
	id: "Contentment.md";
  slug: "contentment";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Cost Of Space.md": {
	id: "Cost Of Space.md";
  slug: "cost-of-space";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Definition.md": {
	id: "Definition.md";
  slug: "definition";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Devotion.md": {
	id: "Devotion.md";
  slug: "devotion";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Dis-identification.md": {
	id: "Dis-identification.md";
  slug: "dis-identification";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Doer.md": {
	id: "Doer.md";
  slug: "doer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Echoes In Silence.md": {
	id: "Echoes In Silence.md";
  slug: "echoes-in-silence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Emptiness.md": {
	id: "Emptiness.md";
  slug: "emptiness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Equations.md": {
	id: "Equations.md";
  slug: "equations";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Equivalence.md": {
	id: "Equivalence.md";
  slug: "equivalence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Eternal.md": {
	id: "Eternal.md";
  slug: "eternal";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Eternity.md": {
	id: "Eternity.md";
  slug: "eternity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"First Philosophy.md": {
	id: "First Philosophy.md";
  slug: "first-philosophy";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Folding.md": {
	id: "Folding.md";
  slug: "folding";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Futility.md": {
	id: "Futility.md";
  slug: "futility";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Gateway.md": {
	id: "Gateway.md";
  slug: "gateway";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Genesis.md": {
	id: "Genesis.md";
  slug: "genesis";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Gilded Shadows.md": {
	id: "Gilded Shadows.md";
  slug: "gilded-shadows";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Good News.md": {
	id: "Good News.md";
  slug: "good-news";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Hall Of Mirrors.md": {
	id: "Hall Of Mirrors.md";
  slug: "hall-of-mirrors";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Hallucinating Factory.md": {
	id: "Hallucinating Factory.md";
  slug: "hallucinating-factory";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Here-ward.md": {
	id: "Here-ward.md";
  slug: "here-ward";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Here.md": {
	id: "Here.md";
  slug: "here";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"I Am That.md": {
	id: "I Am That.md";
  slug: "i-am-that";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Identity.md": {
	id: "Identity.md";
  slug: "identity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"If Then.md": {
	id: "If Then.md";
  slug: "if-then";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Ignorance.md": {
	id: "Ignorance.md";
  slug: "ignorance";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Illusory Self.md": {
	id: "Illusory Self.md";
  slug: "illusory-self";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Improbability.md": {
	id: "Improbability.md";
  slug: "improbability";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Indivisibility.md": {
	id: "Indivisibility.md";
  slug: "indivisibility";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Infiltration.md": {
	id: "Infiltration.md";
  slug: "infiltration";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Insatiability.md": {
	id: "Insatiability.md";
  slug: "insatiability";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Integration.md": {
	id: "Integration.md";
  slug: "integration";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Khudi.md": {
	id: "Khudi.md";
  slug: "khudi";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Lam Yalid Wa Lam Yulad.md": {
	id: "Lam Yalid Wa Lam Yulad.md";
  slug: "lam-yalid-wa-lam-yulad";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Mania.md": {
	id: "Mania.md";
  slug: "mania";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Manufacture Of Lack.md": {
	id: "Manufacture Of Lack.md";
  slug: "manufacture-of-lack";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Mind Alone.md": {
	id: "Mind Alone.md";
  slug: "mind-alone";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Mind.md": {
	id: "Mind.md";
  slug: "mind";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Misnomer.md": {
	id: "Misnomer.md";
  slug: "misnomer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Mortar.md": {
	id: "Mortar.md";
  slug: "mortar";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"No Me Nowhere.md": {
	id: "No Me Nowhere.md";
  slug: "no-me-nowhere";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"No Mind.md": {
	id: "No Mind.md";
  slug: "no-mind";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"No Path.md": {
	id: "No Path.md";
  slug: "no-path";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Non-attachment.md": {
	id: "Non-attachment.md";
  slug: "non-attachment";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Nonduality.md": {
	id: "Nonduality.md";
  slug: "nonduality";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Nowhere.md": {
	id: "Nowhere.md";
  slug: "nowhere";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Oblivion.md": {
	id: "Oblivion.md";
  slug: "oblivion";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Older As Young.md": {
	id: "Older As Young.md";
  slug: "older-as-young";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"One-Way.md": {
	id: "One-Way.md";
  slug: "one-way";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Orphan.md": {
	id: "Orphan.md";
  slug: "orphan";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Paradox.md": {
	id: "Paradox.md";
  slug: "paradox";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Prayer.md": {
	id: "Prayer.md";
  slug: "prayer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Rabba.md": {
	id: "Rabba.md";
  slug: "rabba";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Shadow.md": {
	id: "Shadow.md";
  slug: "shadow";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Silence.md": {
	id: "Silence.md";
  slug: "silence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Spirituality.md": {
	id: "Spirituality.md";
  slug: "spirituality";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Split-Mind.md": {
	id: "Split-Mind.md";
  slug: "split-mind";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Stillness In Motion.md": {
	id: "Stillness In Motion.md";
  slug: "stillness-in-motion";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Stir.md": {
	id: "Stir.md";
  slug: "stir";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Surrender.md": {
	id: "Surrender.md";
  slug: "surrender";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Sweetheart.md": {
	id: "Sweetheart.md";
  slug: "sweetheart";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Tawaf.md": {
	id: "Tawaf.md";
  slug: "tawaf";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"That-Which-Perceives-Form.md": {
	id: "That-Which-Perceives-Form.md";
  slug: "that-which-perceives-form";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Addict.md": {
	id: "The Addict.md";
  slug: "the-addict";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Aloneness.md": {
	id: "The Aloneness.md";
  slug: "the-aloneness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Empty Instant.md": {
	id: "The Empty Instant.md";
  slug: "the-empty-instant";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Impossible Knowing.md": {
	id: "The Impossible Knowing.md";
  slug: "the-impossible-knowing";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Last Idol.md": {
	id: "The Last Idol.md";
  slug: "the-last-idol";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Shape Of Absence.md": {
	id: "The Shape Of Absence.md";
  slug: "the-shape-of-absence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Speaking Pond.md": {
	id: "The Speaking Pond.md";
  slug: "the-speaking-pond";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Unnatural Recognition.md": {
	id: "The Unnatural Recognition.md";
  slug: "the-unnatural-recognition";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Vehicle.md": {
	id: "The Vehicle.md";
  slug: "the-vehicle";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"This, Or That.md": {
	id: "This, Or That.md";
  slug: "this-or-that";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Those Who Know Speak.md": {
	id: "Those Who Know Speak.md";
  slug: "those-who-know-speak";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"To Whom But You.md": {
	id: "To Whom But You.md";
  slug: "to-whom-but-you";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Turn.md": {
	id: "Turn.md";
  slug: "turn";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Umbilical Cord.md": {
	id: "Umbilical Cord.md";
  slug: "umbilical-cord";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Un —.md": {
	id: "Un —.md";
  slug: "un-";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Underbelly.md": {
	id: "Underbelly.md";
  slug: "underbelly";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unhindered.md": {
	id: "Unhindered.md";
  slug: "unhindered";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Uniqueness.md": {
	id: "Uniqueness.md";
  slug: "uniqueness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unorbiting.md": {
	id: "Unorbiting.md";
  slug: "unorbiting";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unoriginated.md": {
	id: "Unoriginated.md";
  slug: "unoriginated";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Vanity.md": {
	id: "Vanity.md";
  slug: "vanity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Wedge.md": {
	id: "Wedge.md";
  slug: "wedge";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"When I Just See.md": {
	id: "When I Just See.md";
  slug: "when-i-just-see";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Wonder.md": {
	id: "Wonder.md";
  slug: "wonder";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Words.md": {
	id: "Words.md";
  slug: "words";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Yet.md": {
	id: "Yet.md";
  slug: "yet";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"—.md": {
	id: "—.md";
  slug: "";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
