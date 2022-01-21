import React from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { useEffect } from "react";
import { css } from "@emotion/react";

const ImgCripto = styled.img`
	color: white;
	width: 80%;
	position: relative;
	transition: all ease 0.5s;
	filter: drop-shadow(5px 5px 10px #000);
	:hover {
		width: 100%;
		transition: all ease 0.5s;
	}
`;
const Acordion = styled.div`
	background: linear-gradient(180deg, #00000094 0%, rgba(0, 0, 0, 0) 100%);
`;

const Button = styled.button`
	background-color: transparent !important;
	color: white;
	font-size: 140%;
	transition: all ease 0.5s;
	:hover {
		font-size: 160%;
		transition: all ease 0.5s;
		color: #c7c7c7 !important;
	}
	::after {
		background-image: url("/img/down.png");
	}
	:not(.collapsed)::after {
		background-image: url("/img/down.png");
		color: black !important;
	}
`;
const override = css`
	display: block;
	margin: 10px auto;
	margin-top: 50px;
`;

export const Resultado = ({ resultado: res }) => {
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline();

		tl./* from(".imgLogo", {
			x: 0,
			duration: 1,
			opacity: 0,
		}). */ from(
			".accordion",
			{
				duration: 1,
				opacity: 0,
			},
			"<",
		);

		gsap.from(".imgLogo", {
			scrollTrigger: {
				trigger: ".imgLogo",
				toggleActions: "restart pause reverse pause",
				// start: "start center",
				markers: true,
			},
			x: innerWidth * 1,
			rotation: 360,
			duration: 2,
		});
	}, [res]);

	return (
		<>
			<div className='container mt-5'>
				<div className='row box'>
					<div className='mb-md-5 col-s-12 col-md-8'>
						<div className='accordion' id='accordionExample'>
							<Acordion className='accordion-item'>
								<h2 className='accordion-header' id='headingOne'>
									<Button
										className='accordion-button collapsed'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target='#collapseOne'
										aria-expanded='false'
										aria-controls='collapseOne'
									>
										Valor
									</Button>
								</h2>
								<div
									id='collapseOne'
									className='accordion-collapse collapse'
									aria-labelledby='headingOne'
									data-bs-parent='#accordionExample'
								>
									<div className='accordion-body'>{res.PRICE}</div>
								</div>
							</Acordion>
							<Acordion className='accordion-item'>
								<h2 className='accordion-header' id='headingTwo'>
									<Button
										className='accordion-button collapsed'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target='#collapseTwo'
										aria-expanded='false'
										aria-controls='collapseTwo'
									>
										Valor más bajo últimas 24 horas
									</Button>
								</h2>
								<div
									id='collapseTwo'
									className='accordion-collapse collapse'
									aria-labelledby='headingTwo'
									data-bs-parent='#accordionExample'
								>
									<div className='accordion-body'>{res.LOW24HOUR}</div>
								</div>
							</Acordion>
							<Acordion className='accordion-item'>
								<h2 className='accordion-header' id='headingThree'>
									<Button
										className='accordion-button collapsed'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target='#collapseThree'
										aria-expanded='false'
										aria-controls='collapseThree'
									>
										Valor más alto últimas 24 horas
									</Button>
								</h2>
								<div
									id='collapseThree'
									className='accordion-collapse collapse'
									aria-labelledby='headingThree'
									data-bs-parent='#accordionExample'
								>
									<div className='accordion-body'>{res.HIGH24HOUR}</div>
								</div>
							</Acordion>
							<Acordion className='accordion-item'>
								<h2 className='accordion-header' id='headingFour'>
									<Button
										className='accordion-button collapsed'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target='#collapseFour'
										aria-expanded='false'
										aria-controls='collapseFour'
									>
										Variación últimas 24 horas
									</Button>
								</h2>
								<div
									id='collapseFour'
									className='accordion-collapse collapse'
									aria-labelledby='headingFour'
									data-bs-parent='#accordionExample'
								>
									<div className='accordion-body'>{res.CHANGE24HOUR}</div>
								</div>
							</Acordion>
						</div>
					</div>
					<div className='imgLogo col text-center'>
						<ImgCripto
							src={"https://www.cryptocompare.com/" + res.IMAGEURL}
							alt=''
						/>
					</div>
				</div>
			</div>
		</>
	);
};