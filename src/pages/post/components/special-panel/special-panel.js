import { styled } from "styled-components";
import { Icon } from "../../../../components";

const SpecialPanelContainer = ({ editButton, publishedAt, className }) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon
					id="fa-calendar-o"
					size="18px"
					margin="0 7px 0 0"
					onClick={() => {}}
				/>
				{publishedAt}
			</div>

			<div className="buttons">
				{editButton}
				<Icon id="fa-trash-o" size="21px" onClick={() => {}} />
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: ${({ margin }) => margin};
	& .published-at {
		display: flex;
	}
	& .buttons {
		display: flex;
	}
	& i {
		position: relative;
		top: -1px;
	}
`;
