/**
 * AI maths library, because Javascript cant!
 * 
 * Classes:
 *  Dictionary
 *  Queue
 */

class Dictionary
{
    constructor()
    {
        this.datastore = [];
    }
    
    /**
     * Add to dictionary.
     * 
     * @param {*} key 
     * @param {*} value
     * 
     * @returns dictionary
     */
    addToDict(key, value)
    {
        if (key && value && !this.isKeyPresent(key))
        {
            this.datastore.push({
                key: key,
                value: value
            });
            return this.datastore;
        }
    }

    /**
     * Is key already in dictionary?
     * 
     * @param {*} key 
     * @returns bool true/false
     */
    isKeyPresent(key)
    {
        for (var i = 0; i < this.datastore.length; i++)
        {
            if (this.datastore[i].key === key)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * Remove from dictionary by 'key'.
     * 
     * @param {*} key 
     * 
     * @returns dictionary
     */
    removeFromDict(key)
    {
        for (var i = 0; i < this.datastore.length; i++)
        {
            if (this.datastore[i].key === key)
            {
                this.datastore.splice(this.datastore[i], 1);
                return this.datastore;
            }
        }
        return this.datastore;
    }

    /**
     * Find value in dictionary by 'key'.
     * 
     * @param {*} key 
     * @returns value
     * @returns dictionary
     */
    findInDict(key)
    {
        for (var i = 0; i < this.datastore.length; i++)
        {
            if (this.datastore[i].key === key)
            {
                return this.datastore[i].value;
            }
        }
        return this.datastore;
    }

    /**
     * Get dictionary size.
     * 
     * @returns dictionary size
     */
    getDictSize()
    {
        return this.datastore.length;
    }

}


/**
 * The queue data structure is First In First Out.
 */
class Queue
{
    constructor()
    {
        this.collection = [];
    }

    print()
    {
        console.log(this.collection);
    }

    /**
     * Add an elemtent on to collection.
     * 
     * @param {*} element 
     */
    enqueue(element)
    {
        this.collection.push(element);
    }

    /**
     * Remove front element.
     * 
     * @returns the element
     */
    dequeue()
    {
        return this.collection.shift();
    }

    /**
     * Return the front element
     * 
     * @returns front element
     */
    front()
    {
        return this.collection[0];
    }

    /**
     * Get size of collection.
     * 
     * @returns collection size
     */
    size()
    {
        return this.collection.length;
    }

    /**
     * Is the collection empty?
     * 
     * @returns bool true/false
     */
    isEmpty()
    {
        return (this.collection.length === 0);
    }

}