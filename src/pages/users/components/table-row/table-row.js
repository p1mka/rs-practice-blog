import styled from "styled-components";

const TableRowContainer = ({ children, className, border }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? "1px solid black;" : "none;")}

	& > div {
		display:flex;
		padding 0 10px;

	}

	& .login-column {
		width: 172px;
		padding-left: 10px;
	}
	& .registered-at-column {
		width: 213px;
	}
	& role-column {
		width: auto;
	}
`;
