# ServiceFix - Testing Checklist

Use this checklist to verify all features are working correctly.

## ✅ Pre-Testing Setup
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] No errors in browser console
- [ ] No errors in backend terminal

---

## 🧪 Feature Testing

### 1. Home Page - Client Form
- [ ] Navigate to `/` (should show "Request a Service" form)
- [ ] Form has three fields: Name, Phone, Description
- [ ] Submit button is visible
- [ ] Clicking submit without data shows validation error
- [ ] Successfully filling and submitting shows success message
- [ ] Form clears after successful submission
- [ ] Info box shows "How it works" section

### 2. Orders Board - Public View
- [ ] Navigate to `/orders` (should show orders board)
- [ ] Recently submitted order appears with "New" status badge
- [ ] Order shows correct client name, phone, description
- [ ] Orders are sorted with newest first
- [ ] Page refreshes automatically (check after 5 seconds)
- [ ] Multiple orders display in responsive grid

### 3. Login Page
- [ ] Navigate to `/login`
- [ ] Form shows username and password fields
- [ ] Submitting with empty fields shows error
- [ ] Submitting with wrong credentials shows "Invalid credentials"
- [ ] Demo credentials displayed on page
- [ ] Entering correct credentials (Yurii123/Yurii123) succeeds
- [ ] After login, redirects to `/dashboard`

### 4. Provider Dashboard
- [ ] Dashboard shows "Welcome, Yurii123"
- [ ] Three stat cards show: New Orders, Accepted Orders, Total Orders
- [ ] Stats count updates correctly
- [ ] New orders section displays unaccepted orders
- [ ] Each order shows: ID, Client Name, Phone, Description, Submitted time
- [ ] "✓ Accept" button visible on each new order
- [ ] Clicking accept button updates status
- [ ] Accepted order moves to "Accepted Orders" section
- [ ] Accepted section shows: Submitted time and Accepted time
- [ ] Success notification appears after accepting

### 5. Navigation Bar
- [ ] Logo is visible and clickable (goes to home)
- [ ] "Request Service" link works
- [ ] "Orders Board" link works
- [ ] When logged out: "Provider Login" link visible
- [ ] When logged in: "Dashboard" link visible
- [ ] When logged in: Username displayed
- [ ] Logout button appears when logged in
- [ ] Logout clears session and redirects to home

### 6. Authentication & Protected Routes
- [ ] Cannot access `/dashboard` without logging in (redirects to login)
- [ ] Token stored in localStorage after login
- [ ] Refreshing page keeps user logged in
- [ ] Clicking logout removes token
- [ ] After logout, dashboard redirects to login

### 7. Real-time Updates
- [ ] Open Orders Board in two tabs
- [ ] Submit order in first tab
- [ ] Second tab updates within 5 seconds (without refresh)
- [ ] Dashboard updates when new order submitted
- [ ] Dashboard order count increases

### 8. Notifications
- [ ] Submit form successfully → success toast appears
- [ ] Submit form with errors → error toast appears
- [ ] Login with wrong credentials → error notification
- [ ] Accept order → success notification
- [ ] Notifications appear in bottom-right corner
- [ ] Notifications auto-dismiss after 4 seconds
- [ ] Can manually close notifications

### 9. Responsive Design
- [ ] Test on desktop (1920px+)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px - 480px)
- [ ] Navigation is readable on all sizes
- [ ] Forms are usable on mobile
- [ ] Cards stack properly on mobile
- [ ] Text is readable without zooming
- [ ] Buttons are tappable on mobile

### 10. Database Operations
- [ ] Submit multiple orders
- [ ] Verify all orders stored in database
- [ ] Accept order
- [ ] Verify status changed in database
- [ ] Refresh page
- [ ] Verify data persists

---

## 🔐 Security Testing

- [ ] Passwords not visible in source code
- [ ] Token not exposed in console
- [ ] CORS working (requests succeed from frontend)
- [ ] Invalid token rejected (401)
- [ ] Expired token handling works
- [ ] Backend validates all input

---

## ⚠️ Error Handling

- [ ] Submit with empty fields → error message
- [ ] Submit with invalid phone → accepted (no validation)
- [ ] Login with wrong username → error
- [ ] Login with wrong password → error
- [ ] Network error handling (disconnect backend)
- [ ] 404 on invalid URL → shows page not found

---

## 🚀 Performance

- [ ] Page loads in < 2 seconds
- [ ] Orders board loads in < 1 second
- [ ] Submitting order takes < 1 second
- [ ] Accepting order takes < 1 second
- [ ] Dashboard loads in < 1 second

---

## 📱 Mobile Testing

- [ ] Test on iPhone/iPad (Safari)
- [ ] Test on Android (Chrome)
- [ ] Touch interactions work (buttons, inputs)
- [ ] Keyboard appears/disappears correctly
- [ ] Forms are accessible
- [ ] No horizontal scrolling

---

## 🎨 UI/UX

- [ ] Consistent color scheme throughout
- [ ] All text is readable
- [ ] Buttons have clear hover states
- [ ] Loading states visible
- [ ] Error messages are clear
- [ ] Success messages are celebratory
- [ ] Gradient design looks good
- [ ] Spacing and alignment consistent

---

## 📊 Data Scenarios

### Scenario 1: Single Order
- [ ] Submit 1 order
- [ ] Accept it
- [ ] Verify workflow

### Scenario 2: Multiple Orders
- [ ] Submit 5 orders
- [ ] Dashboard shows 5 new orders
- [ ] Accept some orders
- [ ] Verify counts update
- [ ] Verify orders move to accepted section

### Scenario 3: Login/Logout Cycle
- [ ] Log in as Yurii
- [ ] Accept order
- [ ] Logout
- [ ] Log back in
- [ ] Verify order is still accepted

---

## ✨ Polish

- [ ] No console errors
- [ ] No broken links
- [ ] No typos in UI
- [ ] Animations are smooth
- [ ] No unexpected redirects
- [ ] Forms have proper focus states
- [ ] Buttons are clearly clickable

---

## 🐛 Bug Report Format

If you find issues, document them:

**Bug Title**: [Brief description]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected**: [What should happen]
**Actual**: [What actually happened]
**Severity**: [Critical/High/Medium/Low]

---

## ✅ Sign-Off

When all checks pass, sign off:

- Tester: _______________
- Date: _______________
- Notes: _______________

---

**Happy Testing! 🎉**
