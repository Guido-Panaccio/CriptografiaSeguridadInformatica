"use client";
import React from "react";

import { SyncLoader } from "react-spinners";

const Loading = () => (
	<div className="loading-container">
		<SyncLoader color="#123abc" loading={true} size={30} />
		<h2 className="loading-text">
			Cargando
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</h2>{" "}
	</div>
);

export default Loading;
