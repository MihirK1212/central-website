import { React } from 'react'
import SectionChildCard from '../SectionChild/SectionChildCard';
import ParticlesBg from 'particles-bg'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../public.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Section = ({ section }) => {

    section.sectionContent = section.sectionContent.filter(sectionChild => sectionChild.visible === true);

    // to alternate the colors of the section-children.
    let counter = 0;

    const responsive = {
        largeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 3000, min: 1300 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1300, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 572, min: 0 },
            items: 1
        }
    };

    return (
        <div className={`section-box theme-orange py-4 ${"section-bg"}`} id={`${section.sectionName}`}>

            <ParticlesBg type="cobweb" bg={{
                position: "absolute",
                zIndex: 0,
                width: '100%',
                height: '70%',
                overflow: 'hidden',
            }}
                config={{
                    rps: 1,
                    g: 1
                }}
                color={"#808080"}
            />

            <div className="ps-3 d-flex justify-content-evenly align-items-center section-box-child">
                <div style={{
                    width: '80%'
                }}>
                    <Carousel
                        responsive={responsive}
                        autoPlaySpeed={3000}
                        autoPlay={true}
                        infinite={true}
                    >
                        {section.sectionContent.map(sectionChild =>
                            <SectionChildCard
                                key={sectionChild._id}
                                sectionName={section.sectionName}
                                sectionChild={sectionChild}
                                index={counter++}/>)
                        }
                    </Carousel>
                </div>
                <div className={`d-flex typo section-name`}>
                    <div style={{
                        height: 'max-content',
                    }}>
                        {section.sectionName}
                    </div>
                    <Link to={'/public/home/section/' + section._id} style={{
                        zIndex: 1000
                    }}>
                        <FontAwesomeIcon size='4px' className={`section-icon`} icon={faAngleRight} />
                    </Link>
                </div>


            </div>
            <br />
        </div>
    )
}

export default Section
