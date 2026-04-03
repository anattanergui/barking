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
"A Costume Speak.md": {
	id: "A Costume Speak.md";
  slug: "a-costume-speak";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"A Million Words.md": {
	id: "A Million Words.md";
  slug: "a-million-words";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"A Thousand Words.md": {
	id: "A Thousand Words.md";
  slug: "a-thousand-words";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Abbatoir.md": {
	id: "Abbatoir.md";
  slug: "abbatoir";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"About Prayer.md": {
	id: "About Prayer.md";
  slug: "about-prayer";
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
"Absurdity.md": {
	id: "Absurdity.md";
  slug: "absurdity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Algorithm.md": {
	id: "Algorithm.md";
  slug: "algorithm";
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
"Alright.md": {
	id: "Alright.md";
  slug: "alright";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"An Arms Length.md": {
	id: "An Arms Length.md";
  slug: "an-arms-length";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Ancient Urge.md": {
	id: "Ancient Urge.md";
  slug: "ancient-urge";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"And Called It Love.md": {
	id: "And Called It Love.md";
  slug: "and-called-it-love";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Anomaly.md": {
	id: "Anomaly.md";
  slug: "anomaly";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Another Meeting.md": {
	id: "Another Meeting.md";
  slug: "another-meeting";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Another Name.md": {
	id: "Another Name.md";
  slug: "another-name";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Anxiety.md": {
	id: "Anxiety.md";
  slug: "anxiety";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"An’al Haq.md": {
	id: "An’al Haq.md";
  slug: "anal-haq";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Arrogance Of Death.md": {
	id: "Arrogance Of Death.md";
  slug: "arrogance-of-death";
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
"Asymmetrical Loss.md": {
	id: "Asymmetrical Loss.md";
  slug: "asymmetrical-loss";
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
"Attention.md": {
	id: "Attention.md";
  slug: "attention";
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
"Barking Of Dogs.md": {
	id: "Barking Of Dogs.md";
  slug: "barking-of-dogs";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Be Yourself.md": {
	id: "Be Yourself.md";
  slug: "be-yourself";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Because It Could.md": {
	id: "Because It Could.md";
  slug: "because-it-could";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Becoming Unself.md": {
	id: "Becoming Unself.md";
  slug: "becoming-unself";
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
"Being Struck.md": {
	id: "Being Struck.md";
  slug: "being-struck";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Beside.md": {
	id: "Beside.md";
  slug: "beside";
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
"Between Worlds.md": {
	id: "Between Worlds.md";
  slug: "between-worlds";
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
"Both Irrefutably.md": {
	id: "Both Irrefutably.md";
  slug: "both-irrefutably";
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
"Cat And I.md": {
	id: "Cat And I.md";
  slug: "cat-and-i";
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
"Closing.md": {
	id: "Closing.md";
  slug: "closing";
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
"Cocoon.md": {
	id: "Cocoon.md";
  slug: "cocoon";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Collective Delusion.md": {
	id: "Collective Delusion.md";
  slug: "collective-delusion";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Confidant.md": {
	id: "Confidant.md";
  slug: "confidant";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Connection Myth.md": {
	id: "Connection Myth.md";
  slug: "connection-myth";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Consciousness.md": {
	id: "Consciousness.md";
  slug: "consciousness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Consecrated Flicker.md": {
	id: "Consecrated Flicker.md";
  slug: "consecrated-flicker";
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
"Continuity.md": {
	id: "Continuity.md";
  slug: "continuity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Control.md": {
	id: "Control.md";
  slug: "control";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Cost Of More.md": {
	id: "Cost Of More.md";
  slug: "cost-of-more";
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
"Cult.md": {
	id: "Cult.md";
  slug: "cult";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Daily Bread.md": {
	id: "Daily Bread.md";
  slug: "daily-bread";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Daimon.md": {
	id: "Daimon.md";
  slug: "daimon";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"De-Supposition.md": {
	id: "De-Supposition.md";
  slug: "de-supposition";
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
"Decree.md": {
	id: "Decree.md";
  slug: "decree";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Dedication.md": {
	id: "Dedication.md";
  slug: "dedication";
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
"Demigods.md": {
	id: "Demigods.md";
  slug: "demigods";
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
"Dick Measuring Contest.md": {
	id: "Dick Measuring Contest.md";
  slug: "dick-measuring-contest";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Direction.md": {
	id: "Direction.md";
  slug: "direction";
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
"Disillusion.md": {
	id: "Disillusion.md";
  slug: "disillusion";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Disquiet.md": {
	id: "Disquiet.md";
  slug: "disquiet";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Dissolution.md": {
	id: "Dissolution.md";
  slug: "dissolution";
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
"Done.md": {
	id: "Done.md";
  slug: "done";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Dot.md": {
	id: "Dot.md";
  slug: "dot";
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
"Echoes.md": {
	id: "Echoes.md";
  slug: "echoes";
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
"Empty Embodiment.md": {
	id: "Empty Embodiment.md";
  slug: "empty-embodiment";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Equanimity.md": {
	id: "Equanimity.md";
  slug: "equanimity";
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
"Equilibrium.md": {
	id: "Equilibrium.md";
  slug: "equilibrium";
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
"Expression.md": {
	id: "Expression.md";
  slug: "expression";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Extinction.md": {
	id: "Extinction.md";
  slug: "extinction";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Fabi Ayyi Ala I Rabbikuma Tukazziban.md": {
	id: "Fabi Ayyi Ala I Rabbikuma Tukazziban.md";
  slug: "fabi-ayyi-ala-i-rabbikuma-tukazziban";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"False Self.md": {
	id: "False Self.md";
  slug: "false-self";
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
"Flyer’s Myth.md": {
	id: "Flyer’s Myth.md";
  slug: "flyers-myth";
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
"For Fuck’s Sake.md": {
	id: "For Fuck’s Sake.md";
  slug: "for-fucks-sake";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Found And Dropped.md": {
	id: "Found And Dropped.md";
  slug: "found-and-dropped";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Freezer.md": {
	id: "Freezer.md";
  slug: "freezer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Fuck The Dependable.md": {
	id: "Fuck The Dependable.md";
  slug: "fuck-the-dependable";
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
"Ghosted Self.md": {
	id: "Ghosted Self.md";
  slug: "ghosted-self";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Ghosts.md": {
	id: "Ghosts.md";
  slug: "ghosts";
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
"Given.md": {
	id: "Given.md";
  slug: "given";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"God Is A Jealous Lover.md": {
	id: "God Is A Jealous Lover.md";
  slug: "god-is-a-jealous-lover";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Godhead.md": {
	id: "Godhead.md";
  slug: "godhead";
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
"Grace.md": {
	id: "Grace.md";
  slug: "grace";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Groceries.md": {
	id: "Groceries.md";
  slug: "groceries";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Groups For Groups.md": {
	id: "Groups For Groups.md";
  slug: "groups-for-groups";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Growing Up.md": {
	id: "Growing Up.md";
  slug: "growing-up";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Half Awake.md": {
	id: "Half Awake.md";
  slug: "half-awake";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Half-Life.md": {
	id: "Half-Life.md";
  slug: "half-life";
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
"Hallucination.md": {
	id: "Hallucination.md";
  slug: "hallucination";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Heart.md": {
	id: "Heart.md";
  slug: "heart";
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
"Heretics.md": {
	id: "Heretics.md";
  slug: "heretics";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Hollow King.md": {
	id: "Hollow King.md";
  slug: "hollow-king";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Human Condition.md": {
	id: "Human Condition.md";
  slug: "human-condition";
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
"I Am-ing.md": {
	id: "I Am-ing.md";
  slug: "i-am-ing";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"I Equals Body.md": {
	id: "I Equals Body.md";
  slug: "i-equals-body";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"I — I know.md": {
	id: "I — I know.md";
  slug: "i--i-know";
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
"Imago.md": {
	id: "Imago.md";
  slug: "imago";
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
"In Defence Of Thought.md": {
	id: "In Defence Of Thought.md";
  slug: "in-defence-of-thought";
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
"In The First Place.md": {
	id: "In The First Place.md";
  slug: "in-the-first-place";
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
"Ineffable.md": {
	id: "Ineffable.md";
  slug: "ineffable";
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
"Invisible Ink.md": {
	id: "Invisible Ink.md";
  slug: "invisible-ink";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Irreducible Aloneness.md": {
	id: "Irreducible Aloneness.md";
  slug: "irreducible-aloneness";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Is Forever.md": {
	id: "Is Forever.md";
  slug: "is-forever";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Ishq.md": {
	id: "Ishq.md";
  slug: "ishq";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Just This.md": {
	id: "Just This.md";
  slug: "just-this";
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
"Kun.md": {
	id: "Kun.md";
  slug: "kun";
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
"Left Coat.md": {
	id: "Left Coat.md";
  slug: "left-coat";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Life.md": {
	id: "Life.md";
  slug: "life";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Lullaby.md": {
	id: "Lullaby.md";
  slug: "lullaby";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Machinery.md": {
	id: "Machinery.md";
  slug: "machinery";
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
"Marching In Place.md": {
	id: "Marching In Place.md";
  slug: "marching-in-place";
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
"Metaphysical Rot.md": {
	id: "Metaphysical Rot.md";
  slug: "metaphysical-rot";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Metaphysics.md": {
	id: "Metaphysics.md";
  slug: "metaphysics";
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
"Negation.md": {
	id: "Negation.md";
  slug: "negation";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Neither God Nor Me.md": {
	id: "Neither God Nor Me.md";
  slug: "neither-god-nor-me";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Never Get There.md": {
	id: "Never Get There.md";
  slug: "never-get-there";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"No Longer.md": {
	id: "No Longer.md";
  slug: "no-longer";
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
"No Other.md": {
	id: "No Other.md";
  slug: "no-other";
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
"No-Self.md": {
	id: "No-Self.md";
  slug: "no-self";
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
"None.md": {
	id: "None.md";
  slug: "none";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Not-Mutes.md": {
	id: "Not-Mutes.md";
  slug: "not-mutes";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Not-duality.md": {
	id: "Not-duality.md";
  slug: "not-duality";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Nothing Alone.md": {
	id: "Nothing Alone.md";
  slug: "nothing-alone";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Nothing Is At Stake.md": {
	id: "Nothing Is At Stake.md";
  slug: "nothing-is-at-stake";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Nothing To Do With Him.md": {
	id: "Nothing To Do With Him.md";
  slug: "nothing-to-do-with-him";
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
"On Objectification.md": {
	id: "On Objectification.md";
  slug: "on-objectification";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"On Your Own.md": {
	id: "On Your Own.md";
  slug: "on-your-own";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"One And Other.md": {
	id: "One And Other.md";
  slug: "one-and-other";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"One Gaze.md": {
	id: "One Gaze.md";
  slug: "one-gaze";
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
"Ox-Press.md": {
	id: "Ox-Press.md";
  slug: "ox-press";
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
"Pavement Sutra.md": {
	id: "Pavement Sutra.md";
  slug: "pavement-sutra";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Perfection.md": {
	id: "Perfection.md";
  slug: "perfection";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Playthings.md": {
	id: "Playthings.md";
  slug: "playthings";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Positive Thinking.md": {
	id: "Positive Thinking.md";
  slug: "positive-thinking";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Power.md": {
	id: "Power.md";
  slug: "power";
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
"Presence.md": {
	id: "Presence.md";
  slug: "presence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Products And Services.md": {
	id: "Products And Services.md";
  slug: "products-and-services";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Prophet’s Dilemma.md": {
	id: "Prophet’s Dilemma.md";
  slug: "prophets-dilemma";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Protector Parrots.md": {
	id: "Protector Parrots.md";
  slug: "protector-parrots";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Proxy.md": {
	id: "Proxy.md";
  slug: "proxy";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Purgatory.md": {
	id: "Purgatory.md";
  slug: "purgatory";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Purge.md": {
	id: "Purge.md";
  slug: "purge";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Quiet Desperation.md": {
	id: "Quiet Desperation.md";
  slug: "quiet-desperation";
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
"Reader-Writer.md": {
	id: "Reader-Writer.md";
  slug: "reader-writer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Refutation.md": {
	id: "Refutation.md";
  slug: "refutation";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Residues.md": {
	id: "Residues.md";
  slug: "residues";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Retrofitting.md": {
	id: "Retrofitting.md";
  slug: "retrofitting";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Revolt.md": {
	id: "Revolt.md";
  slug: "revolt";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Riddled With Doubt.md": {
	id: "Riddled With Doubt.md";
  slug: "riddled-with-doubt";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Risk Assessment.md": {
	id: "Risk Assessment.md";
  slug: "risk-assessment";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Rock Bottom.md": {
	id: "Rock Bottom.md";
  slug: "rock-bottom";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Sacrament.md": {
	id: "Sacrament.md";
  slug: "sacrament";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Safety Blanket.md": {
	id: "Safety Blanket.md";
  slug: "safety-blanket";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Same I.md": {
	id: "Same I.md";
  slug: "same-i";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Same Old Shit.md": {
	id: "Same Old Shit.md";
  slug: "same-old-shit";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Samsara.md": {
	id: "Samsara.md";
  slug: "samsara";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Schmutz.md": {
	id: "Schmutz.md";
  slug: "schmutz";
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
"Second Hand God.md": {
	id: "Second Hand God.md";
  slug: "second-hand-god";
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
"Shoddy Bastards.md": {
	id: "Shoddy Bastards.md";
  slug: "shoddy-bastards";
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
"Sitting In Silence.md": {
	id: "Sitting In Silence.md";
  slug: "sitting-in-silence";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Sleep’s Sky.md": {
	id: "Sleep’s Sky.md";
  slug: "sleeps-sky";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"So Simple.md": {
	id: "So Simple.md";
  slug: "so-simple";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Solitude.md": {
	id: "Solitude.md";
  slug: "solitude";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Source.md": {
	id: "Source.md";
  slug: "source";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Sovereignty.md": {
	id: "Sovereignty.md";
  slug: "sovereignty";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Spacetime.md": {
	id: "Spacetime.md";
  slug: "spacetime";
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
"Strays.md": {
	id: "Strays.md";
  slug: "strays";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Suicide.md": {
	id: "Suicide.md";
  slug: "suicide";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Summum Bukmun Umyum.md": {
	id: "Summum Bukmun Umyum.md";
  slug: "summum-bukmun-umyum";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Surface.md": {
	id: "Surface.md";
  slug: "surface";
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
"Talking Shit.md": {
	id: "Talking Shit.md";
  slug: "talking-shit";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Tat Tvam Nasi.md": {
	id: "Tat Tvam Nasi.md";
  slug: "tat-tvam-nasi";
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
"That I Am.md": {
	id: "That I Am.md";
  slug: "that-i-am";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"That I Be.md": {
	id: "That I Be.md";
  slug: "that-i-be";
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
"The Accomplishment.md": {
	id: "The Accomplishment.md";
  slug: "the-accomplishment";
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
"The Blind Seer.md": {
	id: "The Blind Seer.md";
  slug: "the-blind-seer";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Boy.md": {
	id: "The Boy.md";
  slug: "the-boy";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Brew.md": {
	id: "The Brew.md";
  slug: "the-brew";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Broken Tool.md": {
	id: "The Broken Tool.md";
  slug: "the-broken-tool";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Divine.md": {
	id: "The Divine.md";
  slug: "the-divine";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Dreaming-I.md": {
	id: "The Dreaming-I.md";
  slug: "the-dreaming-i";
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
"The First Cause.md": {
	id: "The First Cause.md";
  slug: "the-first-cause";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Forgetting Itself.md": {
	id: "The Forgetting Itself.md";
  slug: "the-forgetting-itself";
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
"The God Complex.md": {
	id: "The God Complex.md";
  slug: "the-god-complex";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Holy Ghost.md": {
	id: "The Holy Ghost.md";
  slug: "the-holy-ghost";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Howling.md": {
	id: "The Howling.md";
  slug: "the-howling";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Image Inside.md": {
	id: "The Image Inside.md";
  slug: "the-image-inside";
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
"The Industry.md": {
	id: "The Industry.md";
  slug: "the-industry";
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
"The Last Idol.md": {
	id: "The Last Idol.md";
  slug: "the-last-idol";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Last Nothing.md": {
	id: "The Last Nothing.md";
  slug: "the-last-nothing";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Lost Lineage.md": {
	id: "The Lost Lineage.md";
  slug: "the-lost-lineage";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Lot Of The Lot.md": {
	id: "The Lot Of The Lot.md";
  slug: "the-lot-of-the-lot";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Mirror Sage.md": {
	id: "The Mirror Sage.md";
  slug: "the-mirror-sage";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Myth Of Unaltered States.md": {
	id: "The Myth Of Unaltered States.md";
  slug: "the-myth-of-unaltered-states";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Naked Heresy.md": {
	id: "The Naked Heresy.md";
  slug: "the-naked-heresy";
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
"The Placeless.md": {
	id: "The Placeless.md";
  slug: "the-placeless";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Poor Sod.md": {
	id: "The Poor Sod.md";
  slug: "the-poor-sod";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Question.md": {
	id: "The Question.md";
  slug: "the-question";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"The Same Gaze.md": {
	id: "The Same Gaze.md";
  slug: "the-same-gaze";
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
"The Sightless Eye.md": {
	id: "The Sightless Eye.md";
  slug: "the-sightless-eye";
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
"The Still Point.md": {
	id: "The Still Point.md";
  slug: "the-still-point";
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
"The Word.md": {
	id: "The Word.md";
  slug: "the-word";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Therapy.md": {
	id: "Therapy.md";
  slug: "therapy";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"There.md": {
	id: "There.md";
  slug: "there";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Thief.md": {
	id: "Thief.md";
  slug: "thief";
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
"This Is It.md": {
	id: "This Is It.md";
  slug: "this-is-it";
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
"This, Very Here.md": {
	id: "This, Very Here.md";
  slug: "this-very-here";
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
"Threshold.md": {
	id: "Threshold.md";
  slug: "threshold";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Through Your Eyes.md": {
	id: "Through Your Eyes.md";
  slug: "through-your-eyes";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Throughlines.md": {
	id: "Throughlines.md";
  slug: "throughlines";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"To Myself.md": {
	id: "To Myself.md";
  slug: "to-myself";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"To See.md": {
	id: "To See.md";
  slug: "to-see";
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
"To Whom It May Concern.md": {
	id: "To Whom It May Concern.md";
  slug: "to-whom-it-may-concern";
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
"Trumpet.md": {
	id: "Trumpet.md";
  slug: "trumpet";
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
"Two Deaths.md": {
	id: "Two Deaths.md";
  slug: "two-deaths";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Two-gatherness.md": {
	id: "Two-gatherness.md";
  slug: "two-gatherness";
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
"Undercurrent.md": {
	id: "Undercurrent.md";
  slug: "undercurrent";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unestablished.md": {
	id: "Unestablished.md";
  slug: "unestablished";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unfitting Costume.md": {
	id: "Unfitting Costume.md";
  slug: "unfitting-costume";
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
"Unknowable.md": {
	id: "Unknowable.md";
  slug: "unknowable";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unknowablity.md": {
	id: "Unknowablity.md";
  slug: "unknowablity";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unmeasured.md": {
	id: "Unmeasured.md";
  slug: "unmeasured";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unnameable.md": {
	id: "Unnameable.md";
  slug: "unnameable";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unnamed.md": {
	id: "Unnamed.md";
  slug: "unnamed";
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
"Unowned.md": {
	id: "Unowned.md";
  slug: "unowned";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Unquestioning.md": {
	id: "Unquestioning.md";
  slug: "unquestioning";
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
"Unsummable.md": {
	id: "Unsummable.md";
  slug: "unsummable";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Untitled.md": {
	id: "Untitled.md";
  slug: "untitled";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Vanishing Point.md": {
	id: "Vanishing Point.md";
  slug: "vanishing-point";
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
"War On Myself.md": {
	id: "War On Myself.md";
  slug: "war-on-myself";
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
"Wedge.md": {
	id: "Wedge.md";
  slug: "wedge";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"What Medicine Tonight.md": {
	id: "What Medicine Tonight.md";
  slug: "what-medicine-tonight";
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
"Where The Dead Once Lived.md": {
	id: "Where The Dead Once Lived.md";
  slug: "where-the-dead-once-lived";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Whiskey.md": {
	id: "Whiskey.md";
  slug: "whiskey";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Who Cares.md": {
	id: "Who Cares.md";
  slug: "who-cares";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Whom Shall I Mourn.md": {
	id: "Whom Shall I Mourn.md";
  slug: "whom-shall-i-mourn";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Why The Fuck.md": {
	id: "Why The Fuck.md";
  slug: "why-the-fuck";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Without Script.md": {
	id: "Without Script.md";
  slug: "without-script";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Without The Word.md": {
	id: "Without The Word.md";
  slug: "without-the-word";
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
"Worth Of An Hour.md": {
	id: "Worth Of An Hour.md";
  slug: "worth-of-an-hour";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Written Off.md": {
	id: "Written Off.md";
  slug: "written-off";
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
"Your Order.md": {
	id: "Your Order.md";
  slug: "your-order";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"Your View.md": {
	id: "Your View.md";
  slug: "your-view";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"not-Paradox.md": {
	id: "not-Paradox.md";
  slug: "not-paradox";
  body: string;
  collection: "poems";
  data: any
} & { render(): Render[".md"] };
"— ing —.md": {
	id: "— ing —.md";
  slug: "-ing-";
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
