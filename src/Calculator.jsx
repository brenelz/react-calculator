/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';

function Calculator() {
    const [totalValue, setTotalValue] = useState(null);
    const [currentValue, setCurrentValue] = useState('');
    const [operator, setOperator] = useState('+');

    const inputRef = useRef(null);

    const add = useCallback(() => {
        setCurrentValue('')
        setTotalValue(totalValue => totalValue === null ? currentValue : totalValue + Number(currentValue));
        setOperator('+')
    }, [currentValue]);

    const subtract = useCallback(() => {
        setCurrentValue('')
        setTotalValue(totalValue => totalValue === null ? currentValue : totalValue - Number(currentValue));
        setOperator('-')
    }, [currentValue]);

    const equal = useCallback(() => {
        let total = totalValue;
        if (operator === '+') {
            total = totalValue + Number(currentValue);
        }
        if (operator === '-') {
            total = totalValue - Number(currentValue);
        }
        setCurrentValue(total);
        setTotalValue(null);
    }, [currentValue, operator, totalValue]);

    useEffect(() => {
        inputRef.current.focus();
        if (totalValue === null) {
            inputRef.current.select();
        }
    }, [totalValue]);

    useEffect(() => {
        const keyDownListener = (e) => {
            if (e.shiftKey && e.keyCode === 187) {
                e.preventDefault();
                add();
                return;
            }
            if (e.keyCode === 189) {
                e.preventDefault();
                subtract();
                return;
            }
            if (e.keyCode === 187 || e.key === 'Enter') {
                e.preventDefault();
                equal();
                return;
            }
        }

        window.addEventListener('keydown', keyDownListener)

        return () => {
            window.removeEventListener('keydown', keyDownListener);
        }
    }, [subtract, equal, add]);

    return (
        <div style={{ margin: '0 auto', width: '250px' }}>
            <div style={{ width: '100%', display: 'flex', gap: 10 }}>
                <button onClick={() => {
                    setCurrentValue('');
                    setTotalValue(null);
                    inputRef.current.focus();
                }}>Clear</button>
                <button onClick={add}>+</button>
                <button onClick={subtract}>-</button>
                <button onClick={equal}>=</button>
            </div>
            <input
                ref={inputRef}
                style={{ border: '1px solid #eee', width: '100%', padding: 10, marginTop: 20 }}
                type="number"
                value={currentValue.toString()}
                onChange={(e) => {
                    setCurrentValue(e.target.valueAsNumber)
                }}
            />
        </div >
    )
}

export default Calculator;