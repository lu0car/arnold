import NavbarSimple from "@/Components/NavbarSimple";
import EcommerceCard from "@/Components/EcommerceCard";
export default function ServicesPreview() {
    return (
        <div className="mx-6">

            <NavbarSimple className="mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 my-6">
                <EcommerceCard
                    service={"Oil Change"}
                    image={"https://d2v1gjawtegg5z.cloudfront.net/uploads/files/000/558/846/original/shutterstock_1908266137.jpg?1691697398"}
                    cost={"$15.00"}
                    description={"Regular oil changes help maintain engine performance and extend the life of your vehicle. Our service includes draining old oil, replacing the oil filter, and adding fresh, high-quality oil."}
                />

                <EcommerceCard
                    service={"Brake repair"}
                    image={"https://macdonaldsauto.com/ckuploads/images/brakes.jpg"}
                    cost={"$15.00"}
                    description={"Ensure your safety with our thorough brake inspection and repair service. We check brake pads, rotors, and fluid to keep your braking system in optimal condition."}
                />

                <EcommerceCard
                    service={"Tire Rotation and Balancing"}
                    image={"https://visual-aids.s3-us-west-1.amazonaws.com/tire-pros/learn/tire-rotation-and-balancing/tire-rotation-and-balancing-main.jpg"}
                    cost={"$15.00"}
                    description={"Maximize tire life and improve handling by getting regular tire rotation and balancing. Our service ensures even tire wear and a smoother ride."}
                />

                <EcommerceCard
                    service={"Engine Diagnostic Service"}
                    image={"https://visual-aids.s3-us-west-1.amazonaws.com/tire-pros/learn/tire-rotation-and-balancing/tire-rotation-and-balancing-main.jpg"}
                    cost={"$15.00"}
                    description={"Detect and address engine issues early with our advanced diagnostic service. We use state-of-the-art tools to identify and provide solutions for engine performance problems."}
                />

                <EcommerceCard
                    service={"Transmission Fluid Flush"}
                    image={"https://autochimps.com/wp-content/uploads/2020/07/transmission-fluid-change-cost.jpg"}
                    cost={"$15.00"}
                    description={"Maintain your vehicle's transmission for smooth shifting and optimal performance. Our transmission fluid flush service removes old fluid and replaces it with clean fluid to prevent wear and tear."}
                />

                <EcommerceCard
                    service={"Cooling System Flush"}
                    image={"https://www.holtsauto.com/prestone/wp-content/uploads/sites/2/2020/03/coolant.jpg"}
                    cost={"$15.00"}
                    description={"Prevent overheating and engine damage by maintaining a healthy cooling system. Our flush service removes contaminants and replenishes coolant for optimal temperature control."}
                />


            </div>

        </div>
    );
}