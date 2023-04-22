export const getError = (error) => {
	return error?.message && error.response?.data?.message ? error.response.data.message : error.response;
};

export function round2(num) {
	return Math.round(num * 100 + Number.EPSILON) / 100;
}
