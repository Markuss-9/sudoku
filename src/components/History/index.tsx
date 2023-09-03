import { formatWithClientLocale } from "../../utils/timestamp";
import skull from "../../assets/skull.svg";
import win from "../../assets/win.svg";
import "./History.css";

export function History({ data }: any) {
	return (
		<>
			<div className="list-container">
				{data.map((item: any) => {
					return (
						<div className="list-item">
							<div className="item-box icon">
								{item.status === "Defeat" ? (
									<img
										src={skull}
										className="App-logo"
										alt="logo"
									/>
								) : item.status === "Victory" ? (
									<img
										src={win}
										className="App-logo"
										alt="logo"
									/>
								) : (
									""
								)}
							</div>
							<div className="item-box name">
								{item.difficulty}
							</div>
							<div className="item-box time">
								{formatWithClientLocale(item.timestamp)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
