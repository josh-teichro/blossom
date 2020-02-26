import React from 'react'
import './SplashBodyComponent.css';

export default function SplashBodyComponent() {
    return (
        <div class='bodySection'>
        <img src={require('./smiling.jpg')} alt='SmilingStudent' id='mainImage3'/>
        <img src={require('./laptop.jpg')} alt='Looking at Laptop' id='mainImage2'/>
        <img src={require('./students.jpg')} alt='Group of Students' id='mainImage'/>
        
        <div class = 'welcomeTextBlock'>
            <span class = 'welcomeTextHeading'>
                Find the right university for you.
            </span>
            <span class = 'welcomeText'>
                Using your grades along with your location and program preferences,
                we search through universities and colleges that match your needs.
            </span>
        </div>
        <div class = 'welcomeTextBlock2'>
            <span class = 'welcomeTextHeading'>
                Find the right university for you.
            </span>
            <span class = 'welcomeText'>
                Using your grades along with your location and program preferences,
                we search through universities and colleges that match your needs.
            </span>
        </div>
        <div class = 'welcomeTextBlock'>
            <span class = 'welcomeTextHeading'>
                Find the right university for you.
            </span>
            <span class = 'welcomeText'>
                Using your grades along with your location and program preferences,
                we search through universities and colleges that match your needs.
            </span>
        </div>
        </div>
    )
}
