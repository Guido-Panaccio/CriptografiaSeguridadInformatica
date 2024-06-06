"use client";
import { useState } from "react";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
	const slides = [
		{
			url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgscf.slidemembers.com%2Fdocs%2F1%2F1%2F275%2Fhealth_medical_slide_presentation_274556.jpg&f=1&nofb=1&ipt=ba5f34c02b84f04843a41a95839a4a8fdeccbe9574406673279a65e9f3bbf8d7&ipo=images",
		},
		{
			url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets-global.website-files.com%2F5c95482ae450bb546076fb69%2F5cc871125168e98026e0dced_Medical%2520Presentation.jpg&f=1&nofb=1&ipt=8bab6845d98390236768516a48f088dcfe47017de48414ef3391438db71183d1&ipo=images",
		},
		{
			url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbf%2F6d%2Fa1%2Fbf6da1566d7c464f6a5742e8703d5f4a.jpg&f=1&nofb=1&ipt=535597d9cace6fc437c401a05c8de9d5133dfc49c9076f52ecbd2e506763bb28&ipo=images",
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		const isFistSlide = currentIndex === 0;
		const newIndex = isFistSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};
	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};
	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="max-w-[1400px] h-[780px] py-10  px-1 relative group w-[1400px]">
				<div
					style={{ backgroundImage: `url(${slides[currentIndex].url}) ` }}
					className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
				></div>
				{/* Puntos */}
				<div className="flex top-4 justify-center py-2 text-blue-900">
					{slides.map((slide, slideIndex) => (
						<div
							key={slideIndex}
							onClick={() => goToSlide(slideIndex)}
							className="text-xl cursor-pointer"
						>
							<RxDotFilled />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Slider;
