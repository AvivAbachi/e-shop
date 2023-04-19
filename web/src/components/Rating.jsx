import { useCallback, useMemo } from 'react';

function Rating({
	rating = 0,
	totalReviews = 0,
	numStars = 5,
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

	return (
		<div className='rating' aria-label={`Rating: ${rating} out of ${numStars}`}>
			{stars}
			<span>
				{totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
			</span>
		</div>
	);
}

export default Rating;
