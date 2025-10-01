<script>
	export let options = [] // Array of { value, label, selected }
	export let placeholder = "Select options..."
	export let onSelectionChange = () => {}

	let isOpen = false
	let selectedItems = []

	$: selectedItems = options.filter(option => option.selected)
	$: selectedLabels = selectedItems.map(item => item.label).join(', ')

	function toggleDropdown() {
		isOpen = !isOpen
	}

	function toggleOption(option) {
		// Create new options array with updated selection
		const updatedOptions = options.map(opt => 
			opt.value === option.value 
				? { ...opt, selected: !opt.selected }
				: opt
		)
		onSelectionChange(updatedOptions)
	}

	function removeSelected(optionToRemove) {
		// Create new options array with updated selection
		const updatedOptions = options.map(opt => 
			opt.value === optionToRemove.value 
				? { ...opt, selected: false }
				: opt
		)
		onSelectionChange(updatedOptions)
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event) {
		if (!event.target.closest('.multiselect-container')) {
			isOpen = false
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="multiselect-container">
	<div class="selected-items">
		{#each selectedItems as item}
			<span class="selected-tag">
				{item.label}
				<button 
					class="remove-tag"
					on:click|stopPropagation={() => removeSelected(item)}
					aria-label="Remove {item.label}"
				>
					×
				</button>
			</span>
		{/each}
		{#if selectedItems.length === 0}
			<span class="placeholder">{placeholder}</span>
		{/if}
		<button class="dropdown-toggle" on:click|stopPropagation={toggleDropdown}>
			{isOpen ? '▼' : '▲'}
		</button>
	</div>

	{#if isOpen}
		<div class="dropdown">
			{#each options as option}
				<label class="option-item" on:click|preventDefault={() => toggleOption(option)}>
					<input 
						type="checkbox" 
						checked={option.selected}
						readonly
					/>
					<span class="option-label">{option.label}</span>
				</label>
			{/each}
		</div>
	{/if}
</div>

<style>
	.multiselect-container {
		position: relative;
		width: 100%;
		font-size: 0.85rem;
	}

	.selected-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0.5rem;
		border: 1px solid #e0e0e0;
		border-radius: 3px;
		background: white;
		min-height: 2rem;
		align-items: center;
		cursor: pointer;
	}

	.selected-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: #f0f8ff;
		color: #2563eb;
		padding: 0.2rem 0.4rem;
		border-radius: 2px;
		font-size: 0.75rem;
		border: 1px solid #bfdbfe;
	}

	.remove-tag {
		background: none;
		border: none;
		color: #2563eb;
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0;
		line-height: 1;
		width: 14px;
		height: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remove-tag:hover {
		background: rgba(37, 99, 235, 0.1);
		border-radius: 50%;
	}

	.placeholder {
		color: #999;
		font-style: italic;
		flex: 1;
	}

	.dropdown-toggle {
		background: none;
		border: none;
		color: #666;
		cursor: pointer;
		padding: 0.2rem;
		margin-left: auto;
	}

	.dropdown {
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		background: white;
		border: 1px solid #e0e0e0;
		border-bottom: none;
		border-radius: 3px 3px 0 0;
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
		z-index: 10;
		max-height: 200px;
		overflow-y: auto;
	}

	.option-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.option-item:hover {
		background: #f8f9fa;
	}

	.option-item input[type="checkbox"] {
		margin: 0;
		accent-color: #2563eb;
	}

	.option-label {
		flex: 1;
		font-size: 0.8rem;
	}
</style>