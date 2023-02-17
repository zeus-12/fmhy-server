import Search from "../schema/SearchSchema";

export const searchUsingQuery = async (
	query: string,
	page: string,
	nsfw: boolean
) => {
	const ITEMS_PER_PAGE = 30;

	const regex = new RegExp(query, "i");

	const results = await Search.find({
		$or: [{ title: regex }, { link: { $in: [regex] } }],
		isNsfw: nsfw,
	})
		.skip((+page - 1) * ITEMS_PER_PAGE)
		.limit(ITEMS_PER_PAGE);

	const count = await Search.countDocuments({
		$or: [{ title: regex }, { link: { $in: [regex] } }],
		isNsfw: nsfw,
	});

	return { results, count };
};
