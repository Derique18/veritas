/*
=============================================================================
BLOCKVOTE - WEB3 INTEGRATION TEMPLATE
=============================================================================

🎓 STUDENT INSTRUCTIONS:
This file contains the Web3 and blockchain integration functionality.
You'll complete these TODO sections in Modules 3 and 4.

📚 LEARNING OBJECTIVES:
- Understand blockchain and Web3 concepts
- Learn MetaMask integration
- Practice asynchronous programming
- Handle network management
- Manage wallet connections

🚀 PREREQUISITES:
- Complete Modules 1 and 2 first
- Have MetaMask installed
- Switch to Sepolia testnet
- Get test ETH from faucet

=============================================================================
*/

// =============================================================================
// MODULE 3: WEB3 INTEGRATION
// =============================================================================

/*
🎯 EXERCISE 3.1: METAMASK DETECTION

Before we can connect to a wallet, we need to check if MetaMask is available.
MetaMask injects an 'ethereum' object into the browser's window object.

LEARNING NOTE: Always check if required dependencies exist before using them.
This prevents errors and provides better user experience.
*/

// TODO 3.1: Complete the detectMetaMask function
function detectMetaMask() {
    // STUDENT TASK: Check if MetaMask is available
    // 1. Check if window.ethereum exists
    // 2. Check if it's specifically MetaMask (window.ethereum.isMetaMask)
    // 3. Return true if both conditions are met, false otherwise
    
    // HINT: Use the logical AND operator (&&)
    // HINT: return window.ethereum && window.ethereum.isMetaMask;
    
    // 🚨 YOUR CODE STARTS HERE:
    
    
    // 🚨 YOUR CODE ENDS HERE
}

/*
🎯 EXERCISE 3.2: WALLET CONNECTION

This is the core function that connects your app to MetaMask.
It requests permission to access the user's accounts.

LEARNING NOTE: This function is async because blockchain operations
take time and we don't want to freeze the browser.
*/

// TODO 3.2: Complete the connectWallet function
async function connectWallet() {
    console.log('👛 Attempting to connect wallet...');
    
    try {
        // STUDENT TASK: Connect to MetaMask
        // 1. Check if MetaMask is detected
        // 2. Request account access using eth_requestAccounts
        // 3. Get the connected account
        // 4. Update AppState with connection info
        // 5. Call handleWalletConnection with the account
        // 6. Check and handle network
        
        // STEP 1: Check MetaMask availability
        if (!detectMetaMask()) {
            throw new Error('MetaMask not detected. Please install MetaMask extension.');
        }
        
        // STEP 2: Request account access
        // HINT: const accounts = await window.ethereum.request({
        //           method: 'eth_requestAccounts'
        //       });
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
        
        // STEP 3: Validate we got accounts
        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found. Please check MetaMask.');
        }
        
        // STEP 4: Get the first account
        const account = accounts[0];
        console.log('✅ Wallet connected:', account);
        
        // STEP 5: Update application state
        // HINT: AppState.isWalletConnected = true;
        // HINT: AppState.currentAccount = account;
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
        
        // STEP 6: Handle successful connection
        handleWalletConnection(account);
        
        // STEP 7: Check network
        await checkNetwork();
        
        return account;
        
    } catch (error) {
        console.error('❌ Wallet connection failed:', error);
        
        // Handle specific error types
        if (error.code === 4001) {
            showErrorMessage('Connection rejected. Please approve the connection in MetaMask.');
        } else if (error.code === -32002) {
            showErrorMessage('Connection request pending. Please check MetaMask.');
        } else {
            showErrorMessage(error.message || 'Failed to connect wallet. Please try again.');
        }
        
        return null;
    }
}

/*
🎯 EXERCISE 3.3: HANDLE SUCCESSFUL CONNECTION

This function is called when wallet connection succeeds.
It updates the UI and prepares the app for blockchain interactions.
*/

// TODO 3.3: Complete the handleWalletConnection function
function handleWalletConnection(account) {
    console.log('🎉 Handling successful wallet connection for:', account);
    
    // STUDENT TASK: Handle successful wallet connection
    // 1. Update the wallet display in the UI
    // 2. Check user's voting status
    // 3. Show success message
    // 4. Enable voting functionality
    
    // STEP 1: Update wallet display
    // HINT: Call updateWalletDisplay() function
    
    // 🚨 YOUR CODE STARTS HERE:
    
    
    // 🚨 YOUR CODE ENDS HERE
    
    // STEP 2: Check voting status
    // HINT: Call checkUserVotingStatus() function
    
    // 🚨 YOUR CODE STARTS HERE:
    
    
    // 🚨 YOUR CODE ENDS HERE
    
    // STEP 3: Show success message
    // HINT: showSuccessMessage('Wallet connected successfully!');
    
    // 🚨 YOUR CODE STARTS HERE:
    
    
    // 🚨 YOUR CODE ENDS HERE
    
    console.log('✅ Wallet connection handling complete');
}

/*
🎯 EXERCISE 3.4: NETWORK MANAGEMENT

Blockchain apps need to work on specific networks. This function
checks if the user is on the correct network (Sepolia testnet).
*/

// TODO 3.4: Complete the checkNetwork function
async function checkNetwork() {
    try {
        console.log('🌐 Checking network...');
        
        // STUDENT TASK: Check and manage network
        // 1. Get current network ID
        // 2. Check if it matches Sepolia testnet (0xaa36a7)
        // 3. If wrong network, prompt user to switch
        // 4. Update AppState with network info
        
        // STEP 1: Get current network
        // HINT: const chainId = await window.ethereum.request({
        //           method: 'eth_chainId'
        //       });
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
        
        console.log('Current network ID:', chainId);
        
        // STEP 2: Check if correct network
        const sepoliaChainId = '0xaa36a7';
        
        if (chainId === sepoliaChainId) {
            // Correct network
            AppState.currentNetwork = 'Sepolia Testnet';
            console.log('✅ Connected to Sepolia testnet');
            return true;
        } else {
            // Wrong network - prompt to switch
            console.log('⚠️ Wrong network detected');
            
            const shouldSwitch = confirm(
                'You are not connected to Sepolia testnet. ' +
                'Would you like to switch networks?'
            );
            
            if (shouldSwitch) {
                await switchToSepolia();
            } else {
                showErrorMessage('Please switch to Sepolia testnet to use this app.');
                return false;
            }
        }
        
    } catch (error) {
        console.error('❌ Network check failed:', error);
        showErrorMessage('Failed to check network. Please try again.');
        return false;
    }
}

/*
🎯 EXERCISE 3.5: NETWORK SWITCHING

This function helps users switch to the correct network automatically.
*/

// TODO 3.5: Complete the switchToSepolia function
async function switchToSepolia() {
    try {
        console.log('🔄 Switching to Sepolia testnet...');
        
        // STUDENT TASK: Switch to Sepolia network
        // 1. Try to switch to Sepolia using wallet_switchEthereumChain
        // 2. If network doesn't exist, add it using wallet_addEthereumChain
        // 3. Update AppState on success
        
        // STEP 1: Try to switch to existing network
        // HINT: await window.ethereum.request({
        //           method: 'wallet_switchEthereumChain',
        //           params: [{ chainId: '0xaa36a7' }]
        //       });
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
        
        // If we get here, switch was successful
        AppState.currentNetwork = 'Sepolia Testnet';
        console.log('✅ Switched to Sepolia testnet');
        showSuccessMessage('Switched to Sepolia testnet successfully!');
        
    } catch (error) {
        console.error('❌ Network switch failed:', error);
        
        // If network doesn't exist, try to add it
        if (error.code === 4902) {
            try {
                await addSepoliaNetwork();
            } catch (addError) {
                console.error('❌ Failed to add network:', addError);
                showErrorMessage('Failed to add Sepolia network. Please add it manually in MetaMask.');
            }
        } else {
            showErrorMessage('Failed to switch network. Please switch manually in MetaMask.');
        }
    }
}

/*
🎯 EXERCISE 3.6: ADD NETWORK

This function adds the Sepolia testnet to MetaMask if it doesn't exist.
*/

// TODO 3.6: Complete the addSepoliaNetwork function
async function addSepoliaNetwork() {
    try {
        console.log('➕ Adding Sepolia network to MetaMask...');
        
        // STUDENT TASK: Add Sepolia network to MetaMask
        // Use wallet_addEthereumChain method with network parameters
        
        // HINT: await window.ethereum.request({
        //           method: 'wallet_addEthereumChain',
        //           params: [{
        //               chainId: '0xaa36a7',
        //               chainName: 'Sepolia Testnet',
        //               nativeCurrency: {
        //                   name: 'Sepolia ETH',
        //                   symbol: 'SEP',
        //                   decimals: 18
        //               },
        //               rpcUrls: ['https://sepolia.infura.io/v3/'],
        //               blockExplorerUrls: ['https://sepolia.etherscan.io/']
        //           }]
        //       });
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
        
        AppState.currentNetwork = 'Sepolia Testnet';
        console.log('✅ Sepolia network added successfully');
        showSuccessMessage('Sepolia testnet added to MetaMask!');
        
    } catch (error) {
        console.error('❌ Failed to add Sepolia network:', error);
        throw error;
    }
}

/*
🎯 EXERCISE 3.7: UPDATE WALLET DISPLAY

This function updates the UI to show wallet connection status.
*/

// TODO 3.7: Complete the updateWalletDisplay function
function updateWalletDisplay() {
    // STUDENT TASK: Update wallet UI elements
    // 1. Find wallet-related DOM elements
    // 2. Show/hide elements based on connection status
    // 3. Update text content with wallet info
    
    console.log('🎨 Updating wallet display...');
    
    // Find UI elements
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    const walletInfo = document.getElementById('wallet-info');
    const walletAddress = document.getElementById('wallet-address');
    const networkInfo = document.getElementById('network-info');
    
    if (AppState.isWalletConnected) {
        // STEP 1: Hide connect button, show wallet info
        // HINT: connectWalletBtn.style.display = 'none';
        // HINT: walletInfo.style.display = 'block';
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
        
        // STEP 2: Update wallet address display
        if (walletAddress) {
            // HINT: walletAddress.textContent = `Connected: ${formatWalletAddress(AppState.currentAccount)}`;
            
            // 🚨 YOUR CODE STARTS HERE:
            
            
            // 🚨 YOUR CODE ENDS HERE
        }
        
        // STEP 3: Update network display
        if (networkInfo) {
            // HINT: networkInfo.textContent = `Network: ${AppState.currentNetwork || 'Unknown'}`;
            
            // 🚨 YOUR CODE STARTS HERE:
            
            
            // 🚨 YOUR CODE ENDS HERE
        }
        
    } else {
        // STEP 4: Show connect button, hide wallet info
        // HINT: connectWalletBtn.style.display = 'flex';
        // HINT: walletInfo.style.display = 'none';
        
        // 🚨 YOUR CODE STARTS HERE:
        
        
        // 🚨 YOUR CODE ENDS HERE
    }
    
    console.log('✅ Wallet display updated');
}

// =============================================================================
// MODULE 3: VALIDATION FUNCTION
// =============================================================================

/*
🎯 SELF-CHECK: MODULE 3 VALIDATION

This function tests if you completed Module 3 correctly.
Run this in the browser console to check your work!
*/

function validateModule3() {
    console.log('🧪 Testing Module 3 Implementation...');
    let allTestsPassed = true;
    
    // Test 1: MetaMask detection
    console.log('\n🔍 Test 1: MetaMask Detection');
    try {
        const detected = detectMetaMask();
        if (typeof detected === 'boolean') {
            console.log('✅ detectMetaMask returns boolean:', detected);
        } else {
            console.log('❌ detectMetaMask should return boolean');
            allTestsPassed = false;
        }
    } catch (error) {
        console.log('❌ detectMetaMask has errors:', error.message);
        allTestsPassed = false;
    }
    
    // Test 2: Function existence
    console.log('\n🔧 Test 2: Required Functions');
    const requiredFunctions = [
        'connectWallet',
        'handleWalletConnection', 
        'checkNetwork',
        'switchToSepolia',
        'addSepoliaNetwork',
        'updateWalletDisplay'
    ];
    
    requiredFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`✅ ${funcName} function exists`);
        } else {
            console.log(`❌ ${funcName} function missing`);
            allTestsPassed = false;
        }
    });
    
    // Test 3: MetaMask availability
    console.log('\n🦊 Test 3: MetaMask Availability');
    if (typeof window.ethereum !== 'undefined') {
        console.log('✅ MetaMask detected in browser');
        if (window.ethereum.isMetaMask) {
            console.log('✅ Confirmed MetaMask extension');
        } else {
            console.log('⚠️ Ethereum provider detected but may not be MetaMask');
        }
    } else {
        console.log('❌ MetaMask not detected - please install MetaMask extension');
        console.log('📥 Download from: https://metamask.io');
        allTestsPassed = false;
    }
    
    // Final result
    console.log('\n🎯 MODULE 3 RESULTS:');
    if (allTestsPassed) {
        console.log('🎉 CONGRATULATIONS! Module 3 Complete!');
        console.log('📚 You can now proceed to Module 4');
        console.log('💡 Next: Learn about blockchain transactions');
        console.log('🧪 Test wallet connection: Run connectWallet() in console');
    } else {
        console.log('📝 Please fix the issues above before proceeding');
        console.log('💭 Tip: Check the STUDENT-GUIDE.md for detailed help');
    }
    
    return allTestsPassed;
}

// =============================================================================
// MODULE 4: BLOCKCHAIN TRANSACTIONS (TODO SECTIONS)
// =============================================================================

/*
🎯 MODULE 4 PREVIEW

The following functions are for Module 4. Complete Module 3 first!
These functions handle actual blockchain transactions.
*/

// TODO 4.1: Complete the simulateVoteSubmission function (Module 4)
function simulateVoteSubmission() {
    // STUDENT TASK (Module 4): Simulate blockchain vote submission
    // This function will be completed in Module 4
    
    console.log('📝 TODO: Complete this function in Module 4');
    console.log('📖 See STUDENT-GUIDE.md Module 4 for instructions');
    
    // For now, just show a message
    showErrorMessage('Vote submission will be implemented in Module 4');
}

// TODO 4.2: Complete the showLoadingSpinner function (Module 4)
function showLoadingSpinner() {
    // STUDENT TASK (Module 4): Show loading state during transactions
    console.log('📝 TODO: Complete this function in Module 4');
}

// TODO 4.3: Complete the showTransactionSuccess function (Module 4)
function showTransactionSuccess(transactionHash) {
    // STUDENT TASK (Module 4): Show transaction success state
    console.log('📝 TODO: Complete this function in Module 4');
}

// TODO 4.4: Complete the showTransactionError function (Module 4)
function showTransactionError(errorMessage) {
    // STUDENT TASK (Module 4): Show transaction error state
    console.log('📝 TODO: Complete this function in Module 4');
}

// =============================================================================
// EVENT LISTENERS FOR WALLET EVENTS
// =============================================================================

/*
🎁 PROVIDED: WALLET EVENT LISTENERS

These event listeners handle wallet events like account changes and disconnections.
You don't need to modify these, but you should understand how they work.
*/

// Listen for account changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function(accounts) {
        console.log('👛 Account changed:', accounts);
        
        if (accounts.length === 0) {
            // User disconnected wallet
            console.log('👛 Wallet disconnected');
            AppState.isWalletConnected = false;
            AppState.currentAccount = null;
            AppState.currentNetwork = null;
            updateWalletDisplay();
            showErrorMessage('Wallet disconnected. Please reconnect to continue voting.');
        } else {
            // User switched accounts
            const newAccount = accounts[0];
            console.log('👛 Switched to account:', newAccount);
            AppState.currentAccount = newAccount;
            handleWalletConnection(newAccount);
        }
    });
    
    // Listen for network changes
    window.ethereum.on('chainChanged', function(chainId) {
        console.log('🌐 Network changed:', chainId);
        
        // Reload the page when network changes to ensure clean state
        // This is a common practice in Web3 apps
        window.location.reload();
    });
}

/*
=============================================================================
🎓 MODULE 3 & 4 PROGRESS TRACKER
=============================================================================

Keep track of your Web3 learning progress:

MODULE 3: WEB3 INTEGRATION
[ ] TODO 3.1: detectMetaMask function
[ ] TODO 3.2: connectWallet function
[ ] TODO 3.3: handleWalletConnection function
[ ] TODO 3.4: checkNetwork function
[ ] TODO 3.5: switchToSepolia function
[ ] TODO 3.6: addSepoliaNetwork function
[ ] TODO 3.7: updateWalletDisplay function
[ ] ✅ Passed validateModule3() test
[ ] ✅ Successfully connected MetaMask
[ ] ✅ Switched to Sepolia testnet

MODULE 4: BLOCKCHAIN TRANSACTIONS
[ ] TODO 4.1: simulateVoteSubmission function
[ ] TODO 4.2: showLoadingSpinner function
[ ] TODO 4.3: showTransactionSuccess function
[ ] TODO 4.4: showTransactionError function
[ ] ✅ Successfully submitted test vote
[ ] ✅ Handled transaction errors gracefully

🎉 WEB3 MASTERY ACHIEVED!
[ ] Understand blockchain concepts
[ ] Can connect to MetaMask
[ ] Can handle network switching
[ ] Can submit transactions
[ ] Ready for real smart contracts!

=============================================================================
*/
