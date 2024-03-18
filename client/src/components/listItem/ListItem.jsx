import React, { useEffect } from "react";
import "./listItem.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Add,
	PlayArrow,
	ThumbDownAltOutlined,
	ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useState } from "react";

export default function ListItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get("/movies/find/" + item, {
					headers: {
						token:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzFlZTM3NThhZWU2Yjg5N2Y2ODdjOSIsImlhdCI6MTcxMDM0MTE3OSwiZXhwIjoxNzEwNzczMTc5fQ.-_evrsx8vmaFguOT3N9POInWknz8sgZ7OdAc2ynGi6g",
					},
				});

				setMovie(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getMovie();
	}, [item]);

	return (
		<Link to={{ pathname: "/watch", movie: movie }}>
			<div
				className="listItem"
				style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={movie.img} alt="" />
				{isHovered && (
					<>
						<video src={movie.trailer} autoPlay={true} loop />
						<div className="itemInfo">
							<div className="icons">
								<PlayArrow className="icon" />
								<Add className="icon" />
								<ThumbUpAltOutlined className="icon" />
								<ThumbDownAltOutlined className="icon" />
							</div>
							<div className="itemInfoTop">
								<span>{movie.duration}</span>
								<span className="limit">+{movie.limit}</span>
								<span>{movie.year}</span>
							</div>
							<div className="desc">{movie.desc}</div>
							<div className="genre">{movie.genre}</div>
						</div>
					</>
				)}
			</div>
		</Link>
	);
}
