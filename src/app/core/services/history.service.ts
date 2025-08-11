import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private undoStack = signal<string[]>([]);
  private redoStack = signal<string[]>([]);

  // Computed signals for UI binding
  canUndo = computed(() => this.undoStack().length > 0);
  canRedo = computed(() => this.redoStack().length > 0);

  saveState(state: string): void {
    this.undoStack.update(stack => [...stack, state]);
    this.redoStack.set([]); // Clear redo stack on new action
  }

  undo(currentState: string): string | undefined {
    const lastState = this.undoStack().pop();
    if (lastState) {
      this.redoStack.update(stack => [currentState, ...stack]);
      // No need to explicitly trigger signal update for undoStack, pop() does it
    }
    return lastState;
  }

  redo(currentState: string): string | undefined {
    const nextState = this.redoStack().shift(); // Use shift for redo
    if (nextState) {
      this.undoStack.update(stack => [...stack, currentState]);
      // No need to explicitly trigger signal update for redoStack, shift() does it
    }
    return nextState;
  }
}