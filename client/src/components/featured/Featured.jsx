import React from "react";
import "./featured.scss";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Featured({ type, setGenre }) {
	const [content, setContent] = useState({});
	const navigate = useNavigate(); // Initialize useNavigate

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(`/movies/random?type=${type}`, {
					headers: {
						token:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzQ1YTI2NWQ2OTdlZTZhNGQ2M2FmMSIsImlhdCI6MTcxMDk5MDExOCwiZXhwIjoxNzExNDIyMTE4fQ.fkObCVxxRjZtMj3yzC-H-VpxcZgGlTmdyC98NtQKfes",
					},
				});
				setContent(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [type]);

	const handlePlayClick = () => {
		// Redirect user to the watch page
		navigate("/watch"); // Change "/watch" to your watch page route
	};

	return (
		<div className="featured">
			<img src={content.img} />
			<div className="info">
				<span className="desc">{content.desc}</span>
				<div className="buttons">
					<button className="play" onClick={handlePlayClick}>
						<PlayArrow />
						<span>Play</span>
					</button>
				</div>
			</div>
		</div>
	);
}
