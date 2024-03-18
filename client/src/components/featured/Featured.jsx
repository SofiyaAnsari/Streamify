import React from "react";
import "./featured.scss";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Featured({ type }) {
	const [content, setContent] = useState({});

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(`/movies/random?type=${type}`, {
					headers: {
						token:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzFlZTM3NThhZWU2Yjg5N2Y2ODdjOSIsImlhdCI6MTcxMDM0MTE3OSwiZXhwIjoxNzEwNzczMTc5fQ.-_evrsx8vmaFguOT3N9POInWknz8sgZ7OdAc2ynGi6g",
					},
				});
				setContent(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [type]);

	console.log(content);
	return (
		<div className="featured">
			{type && (
				<div className="category">
					<span>{type == "movie" ? "Movies" : "Series"}</span>
					<select name="genre" id="genre">
						<option>Genre</option>
						<option value="action">Action</option>
						<option value="comedy">Comedy</option>
						<option value="drama">Drama</option>
						<option value="thriller">Thriller</option>
						<option value="sci-fi">Science Fiction</option>
						<option value="fantasy">Fantasy</option>
						<option value="romance">Romance</option>
						<option value="horror">Horror</option>
						<option value="mystery">Mystery</option>
					</select>
				</div>
			)}
			<img src={content.img} />
			<div className="info">
				<img src={content.imgTitle} />
				<span className="desc">{content.desc}</span>
				<div className="buttons">
					<button className="play">
						<PlayArrow />
						<span>Play</span>
					</button>
					<button className="more">
						<InfoOutlined />
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
}
