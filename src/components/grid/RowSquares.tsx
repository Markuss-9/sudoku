import { Square } from "./Square";

export const RowSquares = ({ row }: any) => {
	return (
		<>
			{/* <Square value={"5"} />
			<Square value={"5"} />
			<Square /> */}
			<div>
				{row.map((element: number) => {
					return <Square value={element} />;
				})}
			</div>
		</>
	);
};
