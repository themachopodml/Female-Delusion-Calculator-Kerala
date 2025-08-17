// Kerala Female Delusion Calculator - Main JavaScript File
// Handles all interactions and calculations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the calculator
    initializeCalculator();
});

function initializeCalculator() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Show example scenarios
    showExampleScenarios();
}

function setupEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateResults);
    
    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', resetForm);
    
    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
    
    // Export button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportResults);
    }
    
    // Real-time calculation on change (optional)
    const formInputs = document.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Optional: Enable real-time calculation
            // calculateResults();
        });
    });
}

function initializeTooltips() {
    const infoIcons = document.querySelectorAll('.info-icon');
    const tooltip = document.getElementById('tooltip');
    
    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (tooltip && tooltipText) {
                tooltip.textContent = tooltipText;
                tooltip.style.opacity = '1';
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });
        
        icon.addEventListener('mousemove', function(e) {
            if (tooltip) {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
            }
        });
    });
}

function collectFormData() {
    const formData = {
        ages: [],
        height: 100,
        education: 100,
        income: 100,
        employment: [],
        religion: [],
        bodyType: [],
        maritalStatus: [],
        location: [],
        lifestyle: []
    };
    
    // Collect age preferences (checkboxes)
    const ageInputs = document.querySelectorAll('#age-group input[type="checkbox"]:checked');
    ageInputs.forEach(input => {
        formData.ages.push(input.value);
    });
    
    // Collect height preference (select)
    const heightSelect = document.getElementById('height-select');
    formData.height = parseInt(heightSelect.value);
    
    // Collect education preference (select)
    const educationSelect = document.getElementById('education-select');
    formData.education = parseInt(educationSelect.value);
    
    // Collect income preference (select)
    const incomeSelect = document.getElementById('income-select');
    formData.income = parseInt(incomeSelect.value);
    
    // Collect employment preferences (checkboxes)
    const employmentInputs = document.querySelectorAll('#employment-group input[type="checkbox"]:checked');
    employmentInputs.forEach(input => {
        formData.employment.push(input.value);
    });
    
    // Collect religion preferences (checkboxes)
    const religionInputs = document.querySelectorAll('#religion-group input[type="checkbox"]:checked');
    religionInputs.forEach(input => {
        formData.religion.push(input.value);
    });
    
    // Collect body type preferences (checkboxes)
    const bodyTypeInputs = document.querySelectorAll('#bodytype-group input[type="checkbox"]:checked');
    bodyTypeInputs.forEach(input => {
        formData.bodyType.push(input.value);
    });
    
    // Collect marital status preferences (checkboxes)
    const maritalInputs = document.querySelectorAll('#marital-group input[type="checkbox"]:checked');
    maritalInputs.forEach(input => {
        formData.maritalStatus.push(input.value);
    });
    
    // Collect location preferences (checkboxes)
    const locationInputs = document.querySelectorAll('#location-group input[type="checkbox"]:checked');
    locationInputs.forEach(input => {
        formData.location.push(input.value);
    });
    
    // Collect lifestyle preferences (checkboxes)
    const lifestyleInputs = document.querySelectorAll('#lifestyle-group input[type="checkbox"]:checked');
    lifestyleInputs.forEach(input => {
        formData.lifestyle.push(input.value);
    });
    
    return formData;
}

function calculateResults() {
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Calculate using the KeralaCalculator
        const results = KeralaCalculator.calculateMatch(formData);
        
        // Display results
        displayResults(results);
        
        // Show results section
        const resultsSection = document.getElementById('results-section');
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Create visualization
        createResultsChart(results);
        
    } catch (error) {
        console.error('Calculation error:', error);
        showErrorMessage('An error occurred during calculation. Please try again.');
    }
}

function displayResults(results) {
    // Update percentage display
    const percentageElement = document.getElementById('match-percentage');
    const countElement = document.getElementById('match-count');
    
    if (percentageElement && countElement) {
        percentageElement.textContent = KeralaCalculator.formatPercentage(results.percentage) + '%';
        countElement.textContent = KeralaCalculator.formatNumber(results.count) + ' men';
        
        // Add pulse animation for dramatic effect
        percentageElement.classList.add('pulse');
        setTimeout(() => percentageElement.classList.remove('pulse'), 2000);
    }
    
    // Update reality check
    const realityIndicator = document.getElementById('reality-indicator');
    const realityText = document.getElementById('reality-text');
    
    if (realityIndicator && realityText) {
        const realityCheck = results.realityCheck;
        
        // Remove existing reality classes
        realityIndicator.classList.remove('reality-realistic', 'reality-unrealistic', 'reality-very-unrealistic');
        
        // Add appropriate class
        if (realityCheck.level.includes('realistic')) {
            realityIndicator.classList.add('reality-realistic');
        } else {
            realityIndicator.classList.add('reality-unrealistic');
        }
        
        // Update text and icon
        realityText.textContent = realityCheck.text;
        const icon = realityIndicator.querySelector('i');
        if (icon) {
            icon.className = `fas ${realityCheck.icon}`;
        }
        
        // Update indicator color
        realityIndicator.style.borderLeftColor = realityCheck.color;
    }
    
    // Display selected criteria
    displaySelectedCriteria(results.criteria);
}

function displaySelectedCriteria(criteria) {
    const criteriaList = document.getElementById('criteria-list');
    
    if (criteriaList) {
        criteriaList.innerHTML = '';
        
        criteria.forEach(criterion => {
            const tag = document.createElement('span');
            tag.className = 'criteria-tag';
            tag.textContent = criterion;
            criteriaList.appendChild(tag);
        });
    }
}

function createResultsChart(results) {
    const canvas = document.getElementById('resultsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.resultsChart) {
        window.resultsChart.destroy();
    }
    
    // Create new chart
    window.resultsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Matches Your Criteria', 'Does Not Match'],
            datasets: [{
                data: [results.percentage, 100 - results.percentage],
                backgroundColor: [
                    '#27ae60',
                    '#ecf0f1'
                ],
                borderColor: [
                    '#229954',
                    '#bdc3c7'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                title: {
                    display: true,
                    text: 'Available Dating Pool Breakdown',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function resetForm() {
    // Reset all form inputs
    const form = document.querySelector('.form-section');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else if (input.type === 'select-one') {
            input.selectedIndex = 0;
        }
    });
    
    // Hide results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'none';
    
    // Destroy chart if exists
    if (window.resultsChart) {
        window.resultsChart.destroy();
        window.resultsChart = null;
    }
    
    // Show success message
    showSuccessMessage('Form reset successfully!');
}

function shareResults() {
    const percentage = document.getElementById('match-percentage').textContent;
    const count = document.getElementById('match-count').textContent;
    
    const shareText = `I just used the Kerala Female Delusion Calculator! My match percentage is ${percentage} with approximately ${count} available in Kerala. Check your realistic expectations at: ${window.location.href}`;
    
    if (navigator.share) {
        // Use native share API if available
        navigator.share({
            title: 'Kerala Female Delusion Calculator Results',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showSuccessMessage('Results copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showSuccessMessage('Results copied to clipboard!');
        });
    }
}

function exportResults() {
    // Simple implementation - create a data URL with results
    const resultsSection = document.getElementById('results-section');
    
    // Use html2canvas if available, otherwise show message
    if (typeof html2canvas !== 'undefined') {
        html2canvas(resultsSection).then(canvas => {
            const link = document.createElement('a');
            link.download = 'kerala-delusion-calculator-results.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        showInfoMessage('Export functionality requires additional libraries. Results can be shared using the share button.');
    }
}

function showExampleScenarios() {
    // Display example scenarios in console for testing
    console.log('Kerala Delusion Calculator - Example Scenarios:');
    console.log('High Standards:', KERALA_DATA.EXAMPLE_SCENARIOS.HIGH_STANDARDS);
    console.log('Moderate Standards:', KERALA_DATA.EXAMPLE_SCENARIOS.MODERATE_STANDARDS);
    console.log('Basic Standards:', KERALA_DATA.EXAMPLE_SCENARIOS.BASIC_STANDARDS);
}

// Utility functions for messages
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            toast.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            toast.style.backgroundColor = '#e74c3c';
            break;
        case 'info':
            toast.style.backgroundColor = '#3498db';
            break;
        default:
            toast.style.backgroundColor = '#95a5a6';
    }
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.style.opacity = '1', 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        calculateResults();
    }
    
    // Escape to reset
    if (e.key === 'Escape') {
        resetForm();
    }
});

// Add responsive behavior
window.addEventListener('resize', function() {
    // Redraw chart if it exists
    if (window.resultsChart) {
        window.resultsChart.resize();
    }
});

// Performance optimization: Debounce function for real-time calculations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading states
function showLoading() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
    }
}

function hideLoading() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.disabled = false;
        calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate My Reality Check';
    }
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track calculator usage
function trackCalculatorUsage(results) {
    trackEvent('calculator_used', {
        percentage: results.percentage,
        count: results.count,
        reality_level: results.realityCheck.level
    });
}