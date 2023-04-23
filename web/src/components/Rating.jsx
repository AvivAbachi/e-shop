import { useCallback, useMemo } from 'react';

function Rating({
	rating = 0,
	totalReviews = 0,
	numStars = 5,
	caption = '',
	fullStarIcon = 'fas fa-star',
	halfStarIcon = 'fas fa-star-half-alt',
	emptyStarIcon = 'far fa-star',
}) {
	const getRatingIcon = useCallback(
		(rating = 1, offset = 1) => {
			if (rating >= offset) {
				return fullStarIcon;
			} else if (rating >= offset - 0.5) {
				return halfStarIcon;
			} else {
				return emptyStarIcon;
			}
		},
		[fullStarIcon, halfStarIcon, emptyStarIcon]
	);

	const stars = useMemo(() => {
		const starsArray = [];
		for (let i = 1; i <= numStars; i++) {
			starsArray.push(
				<span key={i}>
					<i className={getRatingIcon(rating, i)} />
				</span>
			);
		}
		return starsArray;
	}, [rating, numStars, getRatingIcon]);

	const reviewText = useMemo(
		() => (caption ? caption : `${totalReviews} ${totalReviews === 1 ? 'Review' : 'Reviews'}`),
		[caption, totalReviews]
	);

	return (
		<div className='rating'>
			{stars}
			<span> {reviewText}</span>
		</div>
	);
}

export default Rating;
