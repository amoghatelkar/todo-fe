import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './TodoForm.module.scss';
import { ITodo } from '@/app/page';

interface ITodoForm {
    handleOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
    todo: ITodo;
    isEdit: boolean;
}
export const TodoForm: FC<ITodoForm> = ({ handleOnSubmit, todo, isEdit }) => {

    const [formData, setFormData] = useState<ITodo>(todo);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        console.log(name, type, value);
        switch (type) {
            case 'checkbox': {
                const isChecked = (e.target as HTMLInputElement).checked;
                setFormData(prev => {
                    const key = name as keyof ITodo;
                    const currentValues = prev[key] as string[];
                    return {
                        ...prev,
                        [key]: isChecked
                            ? [...currentValues, value]
                            : (currentValues).filter(v => v !== value)
                    }
                });
            } break;
            case 'file': {
                const file = (e.target as HTMLInputElement).files?.[0] ?? null;
                setFormData(prev => ({ ...prev, attachment: file }));

            } break;
            case 'select-multiple': {
                const selectedOptions = (e.target as HTMLSelectElement).selectedOptions;
                const selected = Array.from(selectedOptions).map((v) => v.value)
                setFormData(prev => ({
                    ...prev,
                    [name]: selected
                }))
            }
                break;
            default: {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }))
            }
        }
    }

    useEffect(() => {
        setFormData(todo);
    }, [todo]);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Todo App</h1>
                <form className={styles.form} onSubmit={handleOnSubmit}>

                    <div>
                        <label htmlFor="title" className={styles.label} >Title</label>
                        <input id="title" name="title" type='text' onChange={handleOnChange} value={formData.title} placeholder='Please enter Todo Title' />
                    </div>

                    <div>
                        <label htmlFor="description" className={styles.label} >Description</label>
                        <textarea id="description" name="description" onChange={handleOnChange} value={formData.description} placeholder='Please enter Todo Description' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <label htmlFor="startDate" className={styles.label} >Start Date</label>
                            <input id="startDate" name="startDate" type='date' value={formData.startDate} onChange={handleOnChange} placeholder='Please enter Start Date' />
                        </div>

                        <div>
                            <label htmlFor="endDate" className={styles.label} >End Date</label>
                            <input id="endDate" name="endDate" type='date' value={formData.endDate} onChange={handleOnChange} placeholder='Please enter End Date' />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <label htmlFor="email" className={styles.label} >Email</label>
                            <input id="email" name="email" type='email' value={formData.email} onChange={handleOnChange} placeholder='Please enter the email id' />
                        </div>

                        <div>
                            <label htmlFor="phone" className={styles.label} >Phone</label>
                            <input id="phone" name="phone" type='tel' value={formData.phone} onChange={handleOnChange} placeholder='Please enter the Phone no.' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="status" className={styles.label} >Status</label>
                        <select name="status" value={formData.status} onChange={handleOnChange}>
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="on-hold">On Hold</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='priority' className={styles.label} >Priority</label>
                        <div style={{ display: 'block', marginTop: '0px', marginBottom: '10px' }}>
                            <label>
                                <input name="priority" type='radio' value="low" checked={formData.priority === "low"} onChange={handleOnChange} /> Low
                            </label>
                            <label>
                                <input name="priority" type='radio' value="medium" checked={formData.priority === "medium"} onChange={handleOnChange} /> Medium
                            </label>
                            <label>
                                <input name="priority" type='radio' value="high" checked={formData.priority === "high"} onChange={handleOnChange} /> High
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="categories" className={styles.label}>Categories</label>
                        <select id="categories" name="categories" multiple value={formData.categories} onChange={handleOnChange} >
                            {["shopping", "learning", "urgent"].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor='tags' className={styles.label} >Tags</label>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {["work", "personal", "other"].map((tag) => (
                                <label key={tag}>
                                    <input name="tags" type='checkbox' checked={formData.tags.includes(tag)} value={tag} onChange={handleOnChange} /> {tag}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor='color' >Color</label>
                        <input style={{ width: '50px', height: '50px', borderRadius: '100%' }} onChange={handleOnChange} id='color' type='color' name='color' />
                    </div>

                    {/* attachment */}
                    <div>
                        <label htmlFor='attachment' >Attachment</label>
                        <input type='file' id="attachment" onChange={handleOnChange} name="attachment" />
                    </div>

                    <button style={{ float: 'right' }} type='submit'> {isEdit ? 'Edit' : 'Submit'}</button>
                </form>
            </div >
        </div >

    )
}