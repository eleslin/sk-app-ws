'use client'
import { MdMaximize } from "react-icons/md";
import Carousel, { DotProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
    children: React.ReactNode;
}


export default function RoutinesCarousel({ children }: Props) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const CustomDot = ({ active, onClick }: DotProps) => {

        return (
            <li
                className="cursor-pointer"
                onClick={() => onClick!()}
            >
                <MdMaximize color={active ? "#fff" : "rgba(255, 255, 255, 0.4"} />
            </li>
        );
    };
    return (
        <div className="relative">
            <Carousel
                className="unset"
                swipeable={true}
                draggable={true}
                responsive={responsive}
                showDots={true}
                ssr={true}
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all 1"
                transitionDuration={500}
                renderDotsOutside={true}
                arrows={true}
                customDot={<CustomDot />}
                containerClass="carousel-container"
                itemClass="px-[10px]"
            >
                {children}
            </Carousel>
        </div>

    )
}