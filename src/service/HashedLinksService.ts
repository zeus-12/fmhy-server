import HashedLinks from "../models/HashedLinksModel";

// const ITEMS_PER_PAGE = 30;

// @ts-ignore
export const getHashedLinks = async (page: string) => {
	const results = await HashedLinks.find();
	// .skip((+page - 1) * ITEMS_PER_PAGE)
	// .limit(ITEMS_PER_PAGE);
	return results;
};
