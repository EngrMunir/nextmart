'use client'

import { useUser } from "@/context/UserContext";

const HomePage = async() => {
    
    const user = useUser();
    
    return (
        <div>
            <h1>Welcome to nextmart home page</h1>
        </div>
    );
};

export default HomePage;