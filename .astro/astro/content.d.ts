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
"Abrupt.md": {
	id: "Abrupt.md";
  slug: "abrupt";
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
"Ash.md": {
	id: "Ash.md";
  slug: "ash";
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
"Bittersweet.md": {
	id: "Bittersweet.md";
  slug: "bittersweet";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Bowed.md": {
	id: "Bowed.md";
  slug: "bowed";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Cessation.md": {
	id: "Cessation.md";
  slug: "cessation";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Continuity.md": {
	id: "Continuity.md";
  slug: "continuity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Dear Heart.md": {
	id: "Dear Heart.md";
  slug: "dear-heart";
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
"Echoes In Silence.md": {
	id: "Echoes In Silence.md";
  slug: "echoes-in-silence";
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
"Folding.md": {
	id: "Folding.md";
  slug: "folding";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Future.md": {
	id: "Future.md";
  slug: "future";
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
"Here-ward.md": {
	id: "Here-ward.md";
  slug: "here-ward";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"In My Bed.md": {
	id: "In My Bed.md";
  slug: "in-my-bed";
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
"Man.md": {
	id: "Man.md";
  slug: "man";
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
"Mercy.md": {
	id: "Mercy.md";
  slug: "mercy";
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
"Mortar.md": {
	id: "Mortar.md";
  slug: "mortar";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Negation.md": {
	id: "Negation.md";
  slug: "negation";
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
"No-Self Talk.md": {
	id: "No-Self Talk.md";
  slug: "no-self-talk";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"None.md": {
	id: "None.md";
  slug: "none";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Now.md": {
	id: "Now.md";
  slug: "now";
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
"Reader-Writer.md": {
	id: "Reader-Writer.md";
  slug: "reader-writer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Retrospect.md": {
	id: "Retrospect.md";
  slug: "retrospect";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Sacrifice.md": {
	id: "Sacrifice.md";
  slug: "sacrifice";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Seamless.md": {
	id: "Seamless.md";
  slug: "seamless";
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
"Split-Mind.md": {
	id: "Split-Mind.md";
  slug: "split-mind";
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
"Strays.md": {
	id: "Strays.md";
  slug: "strays";
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
"The Aloneness.md": {
	id: "The Aloneness.md";
  slug: "the-aloneness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Gap.md": {
	id: "The Gap.md";
  slug: "the-gap";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Invasion.md": {
	id: "The Invasion.md";
  slug: "the-invasion";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Pilgrimage.md": {
	id: "The Pilgrimage.md";
  slug: "the-pilgrimage";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Scar.md": {
	id: "The Scar.md";
  slug: "the-scar";
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
"The Unshared.md": {
	id: "The Unshared.md";
  slug: "the-unshared";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"This Bed.md": {
	id: "This Bed.md";
  slug: "this-bed";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"To —.md": {
	id: "To —.md";
  slug: "to-";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Two Deaths.md": {
	id: "Two Deaths.md";
  slug: "two-deaths";
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
"Uniqueness.md": {
	id: "Uniqueness.md";
  slug: "uniqueness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unseduced.md": {
	id: "Unseduced.md";
  slug: "unseduced";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unseen Form.md": {
	id: "Unseen Form.md";
  slug: "unseen-form";
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
"We Sense.md": {
	id: "We Sense.md";
  slug: "we-sense";
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
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
