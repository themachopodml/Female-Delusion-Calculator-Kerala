// Kerala Delusion Calculator - Data File
// Based on 2011 Census and Government Statistics

const KERALA_DATA = {
    // Base demographics
    TOTAL_MALE_POPULATION_20_44: 5910264,
    TOTAL_POPULATION: 33406061,
    SEX_RATIO: 1084, // females per 1000 males
    LITERACY_RATE: 96.11,
    
    // Age distribution (actual census numbers)
    AGE_DISTRIBUTION: {
        '20-24': { population: 1298826, percentage: 21.98 },
        '25-29': { population: 1203978, percentage: 20.38 },
        '30-34': { population: 1128217, percentage: 19.09 },
        '35-39': { population: 1161819, percentage: 19.66 },
        '40-44': { population: 1117424, percentage: 18.91 }
    },
    
    // Height distribution (cumulative percentages)
    HEIGHT_CRITERIA: {
        'any-height': 100,
        '5-4-above': 85,
        '5-6-above': 50,
        '5-8-above': 20,
        '5-10-above': 5,
        '6-0-above': 1
    },
    
    // Education levels (cumulative percentages)
    EDUCATION_CRITERIA: {
        'any-education': 100,
        'primary-above': 95,
        'secondary-above': 75,
        'higher-secondary-above': 50,
        'graduate-above': 30,
        'post-graduate-above': 8,
        'professional': 2
    },
    
    // Income brackets (cumulative percentages)
    INCOME_CRITERIA: {
        'any-income': 100,
        '10k-above': 65,
        '20k-above': 40,
        '35k-above': 20,
        '50k-above': 8,
        '75k-above': 3,
        '1l-above': 1
    },
    
    // Employment status (individual percentages)
    EMPLOYMENT_CATEGORIES: {
        'government': 8,
        'private': 25,
        'business': 15,
        'professional': 5,
        'any-employed': 53
    },
    
    // Religious distribution
    RELIGION_CATEGORIES: {
        'hindu': 55,
        'muslim': 26,
        'christian': 18,
        'others': 1
    },
    
    // Caste categories
    CASTE_CATEGORIES: {
        'forward-caste': 35,
        'obc': 40,
        'sc': 9,
        'st': 1
    },
    
    // Body type distribution
    BODY_TYPE_CATEGORIES: {
        'slim': 25,
        'average': 45,
        'athletic': 15,
        'heavy': 12
    },
    
    // Marital status
    MARITAL_STATUS_CATEGORIES: {
        'never-married': 45,
        'divorced': 4
    },
    
    // Location preference
    LOCATION_CATEGORIES: {
        'urban': 48,
        'rural': 52
    },
    
    // Lifestyle preferences
    LIFESTYLE_CATEGORIES: {
        'non-smoker': 85,
        'non-drinker': 60,
        'vegetarian': 25,
        'fitness': 30
    },
    
    // Reality check thresholds
    REALITY_THRESHOLDS: {
        VERY_REALISTIC: 15,      // Above 15%
        REALISTIC: 5,            // 5-15%
        SOMEWHAT_UNREALISTIC: 1, // 1-5%
        UNREALISTIC: 0.1,        // 0.1-1%
        VERY_UNREALISTIC: 0      // Below 0.1%
    },
    
    // Example scenarios for demonstration
    EXAMPLE_SCENARIOS: {
        HIGH_STANDARDS: {
            name: "High Standards",
            criteria: {
                height: 20,        // 5'8"+
                education: 30,     // Graduate+
                income: 8,         // ₹50k+
                employment: 8,     // Government
                bodytype: 15,      // Athletic
                marital: 45,       // Never married
                lifestyle: 60      // Non-drinker
            },
            expected_percentage: 0.006
        },
        MODERATE_STANDARDS: {
            name: "Moderate Standards",
            criteria: {
                height: 50,        // 5'6"+
                education: 50,     // Higher Secondary+
                income: 40,        // ₹20k+
                employment: 53,    // Any employed
                marital: 49,       // Unmarried
                religion: 55       // Same religion
            },
            expected_percentage: 1.43
        },
        BASIC_STANDARDS: {
            name: "Basic Standards",
            criteria: {
                education: 75,     // Secondary+
                income: 65,        // ₹10k+
                marital: 49,       // Unmarried
                lifestyle: 85      // Non-smoker
            },
            expected_percentage: 20.30
        }
    }
};

// Utility functions for calculations
const KeralaCalculator = {
    // Calculate match percentage based on selected criteria
    calculateMatch: function(selectedCriteria) {
        let percentage = 1.0; // Start with 100%
        let appliedCriteria = [];
        
        // Age range calculation (additive for multiple ages)
        if (selectedCriteria.ages && selectedCriteria.ages.length > 0) {
            let agePercentage = selectedCriteria.ages.reduce((sum, age) => {
                return sum + KERALA_DATA.AGE_DISTRIBUTION[age].percentage;
            }, 0);
            percentage *= (agePercentage / 100);
            appliedCriteria.push(`Age: ${agePercentage.toFixed(1)}%`);
        }
        
        // Height (cumulative)
        if (selectedCriteria.height && selectedCriteria.height !== 100) {
            percentage *= (selectedCriteria.height / 100);
            appliedCriteria.push(`Height: ${selectedCriteria.height}%`);
        }
        
        // Education (cumulative)
        if (selectedCriteria.education && selectedCriteria.education !== 100) {
            percentage *= (selectedCriteria.education / 100);
            appliedCriteria.push(`Education: ${selectedCriteria.education}%`);
        }
        
        // Income (cumulative)
        if (selectedCriteria.income && selectedCriteria.income !== 100) {
            percentage *= (selectedCriteria.income / 100);
            appliedCriteria.push(`Income: ${selectedCriteria.income}%`);
        }
        
        // Employment (additive for multiple types)
        if (selectedCriteria.employment && selectedCriteria.employment.length > 0) {
            let employmentPercentage = selectedCriteria.employment.reduce((sum, emp) => {
                return sum + KERALA_DATA.EMPLOYMENT_CATEGORIES[emp];
            }, 0);
            percentage *= (employmentPercentage / 100);
            appliedCriteria.push(`Employment: ${employmentPercentage}%`);
        }
        
        // Religion (additive for multiple religions)
        if (selectedCriteria.religion && selectedCriteria.religion.length > 0) {
            let religionPercentage = selectedCriteria.religion.reduce((sum, rel) => {
                return sum + KERALA_DATA.RELIGION_CATEGORIES[rel];
            }, 0);
            percentage *= (religionPercentage / 100);
            appliedCriteria.push(`Religion: ${religionPercentage}%`);
        }
        
        // Body type (additive for multiple types)
        if (selectedCriteria.bodyType && selectedCriteria.bodyType.length > 0) {
            let bodyTypePercentage = selectedCriteria.bodyType.reduce((sum, type) => {
                return sum + KERALA_DATA.BODY_TYPE_CATEGORIES[type];
            }, 0);
            percentage *= (bodyTypePercentage / 100);
            appliedCriteria.push(`Body Type: ${bodyTypePercentage}%`);
        }
        
        // Marital status (additive for multiple statuses)
        if (selectedCriteria.maritalStatus && selectedCriteria.maritalStatus.length > 0) {
            let maritalPercentage = selectedCriteria.maritalStatus.reduce((sum, status) => {
                return sum + KERALA_DATA.MARITAL_STATUS_CATEGORIES[status];
            }, 0);
            percentage *= (maritalPercentage / 100);
            appliedCriteria.push(`Marital: ${maritalPercentage}%`);
        }
        
        // Location (additive for multiple locations)
        if (selectedCriteria.location && selectedCriteria.location.length > 0) {
            let locationPercentage = selectedCriteria.location.reduce((sum, loc) => {
                return sum + KERALA_DATA.LOCATION_CATEGORIES[loc];
            }, 0);
            percentage *= (locationPercentage / 100);
            appliedCriteria.push(`Location: ${locationPercentage}%`);
        }
        
        // Lifestyle (multiplicative for multiple requirements)
        if (selectedCriteria.lifestyle && selectedCriteria.lifestyle.length > 0) {
            selectedCriteria.lifestyle.forEach(lifestyle => {
                percentage *= (KERALA_DATA.LIFESTYLE_CATEGORIES[lifestyle] / 100);
                appliedCriteria.push(`${lifestyle}: ${KERALA_DATA.LIFESTYLE_CATEGORIES[lifestyle]}%`);
            });
        }
        
        const finalPercentage = percentage * 100;
        const estimatedCount = Math.round(KERALA_DATA.TOTAL_MALE_POPULATION_20_44 * percentage);
        
        return {
            percentage: finalPercentage,
            count: estimatedCount,
            criteria: appliedCriteria,
            realityCheck: this.getRealityCheck(finalPercentage)
        };
    },
    
    // Determine reality check based on percentage
    getRealityCheck: function(percentage) {
        const thresholds = KERALA_DATA.REALITY_THRESHOLDS;
        
        if (percentage >= thresholds.VERY_REALISTIC) {
            return {
                level: 'very-realistic',
                text: 'Very Realistic - Great chances!',
                icon: 'fa-check-circle',
                color: '#27ae60'
            };
        } else if (percentage >= thresholds.REALISTIC) {
            return {
                level: 'realistic',
                text: 'Realistic - Good options available',
                icon: 'fa-thumbs-up',
                color: '#f39c12'
            };
        } else if (percentage >= thresholds.SOMEWHAT_UNREALISTIC) {
            return {
                level: 'somewhat-unrealistic',
                text: 'Somewhat Unrealistic - Consider flexibility',
                icon: 'fa-exclamation-triangle',
                color: '#e67e22'
            };
        } else if (percentage >= thresholds.UNREALISTIC) {
            return {
                level: 'unrealistic',
                text: 'Unrealistic - Very limited options',
                icon: 'fa-times-circle',
                color: '#e74c3c'
            };
        } else {
            return {
                level: 'very-unrealistic',
                text: 'Very Unrealistic - Extremely rare to find',
                icon: 'fa-ban',
                color: '#c0392b'
            };
        }
    },
    
    // Format numbers for display
    formatNumber: function(num) {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(1) + ' crore';
        } else if (num >= 100000) {
            return (num / 100000).toFixed(1) + ' lakh';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    },
    
    // Get percentage with appropriate decimal places
    formatPercentage: function(percentage) {
        if (percentage >= 10) {
            return percentage.toFixed(1);
        } else if (percentage >= 1) {
            return percentage.toFixed(2);
        } else if (percentage >= 0.1) {
            return percentage.toFixed(3);
        } else {
            return percentage.toFixed(4);
        }
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KERALA_DATA, KeralaCalculator };
}